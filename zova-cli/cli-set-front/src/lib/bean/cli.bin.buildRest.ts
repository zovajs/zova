import type { ZovaConfigMeta, ZovaMetaAppMode, ZovaMetaFlavor, ZovaMetaMode } from '@cabloy/module-info';
import type { ZovaViteConfigOptions } from 'zova-vite';

import { BeanCliBase } from '@cabloy/cli';
import { camelToKebab, replaceTemplate } from '@cabloy/word-utils';
import fse from 'fs-extra';
import path from 'node:path';
import { rimraf } from 'rimraf';
import { build } from 'tsdown';
import yaml from 'yaml';
import { createConfigUtils, saveJSONFile } from 'zova-vite';

import { loadJSONFile } from '../common/utils.ts';
import { __ThisSetName__ } from '../this.ts';

function svgResolverPlugin() {
  return {
    name: 'svg-resolver',
    resolveId: {
      filter: { id: /\.svg$/ },
      handler(source, importer) {
        return path.resolve(path.dirname(importer), source);
      },
    },
    load: {
      filter: { id: /\.svg$/ },
      handler(_id) {
        return 'export default {};';
      },
    },
  };
}

const __template_package = `{
  "name": "{{Name}}",
  "version": "{{Version}}",
  "type": "module",
  "exports": {
    ".": {
      "types": [
        "./index.d.mts"
      ],
      "import": "./index.mjs"
    },
    "./package.json": "./package.json"
  }
}
`;

declare module '@cabloy/cli' {
  interface ICommandArgv {
    flavor?: ZovaMetaFlavor;
    Modules: string;
    Name: string;
    Version: string;
  }
}

interface IBinBuildRestContext {
  projectPath: string;
  flavor: ZovaMetaFlavor;
  bundleName: string;
  bundleNameCopy: string;
  srcDir: string;
  outDir: string;
  bundleModules?: string[];
}

export class CliBinBuildRest extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    //
    const flavor = argv.flavor || 'admin';
    const bundleName = `zova-rest-${camelToKebab(flavor)}`;
    const bundleNameCopy = `${camelToKebab(flavor)}`;
    //
    const srcDir = path.join(projectPath, '.zova-rest');
    const outDir = path.join(projectPath, 'dist', `rest-${flavor}`);
    await rimraf(srcDir);
    await fse.ensureDir(srcDir);
    await rimraf(outDir);
    // context
    const context: IBinBuildRestContext = {
      projectPath,
      flavor,
      bundleName,
      bundleNameCopy,
      srcDir,
      outDir,
    };
    //
    await this._prepareResources(context);
    await this._build(context);
    //
    await rimraf(srcDir);
  }

  async _prepareResources(context: IBinBuildRestContext) {
    const { projectPath, flavor, bundleName, srcDir } = context;
    const { argv } = this.context;
    //
    const mode: ZovaMetaMode = 'production';
    const appMode: ZovaMetaAppMode = 'ssr';
    const configMeta: ZovaConfigMeta = { flavor, mode, appMode };
    const configOptions: ZovaViteConfigOptions = {
      appDir: projectPath,
      runtimeDir: '.zova',
    };
    const configUtils = createConfigUtils(configMeta, configOptions);
    // env
    const env = configUtils.loadEnvs();
    // modulesMeta
    const modulesMeta = await configUtils.loadModulesMeta();
    // Modules
    const modules: string[] = [];
    const bundleModules: string[] = [];
    for (const module of modulesMeta.modulesArray) {
      modules.push(`export * from '${module.info.fullName}';`);
      const moduleRoot = module.root.replaceAll('\\', '/');
      if (moduleRoot.includes('/src/module/') || moduleRoot.includes('/src/suite/')) {
        bundleModules.push(module.info.fullName);
      }
    }
    context.bundleModules = bundleModules;
    argv.Modules = modules.join('\n');
    // Name/Version
    argv.Name = bundleName;
    argv.Version = env.APP_VERSION;
    // templateDir
    const templateDir = this.template.resolveTemplatePath(__ThisSetName__, 'rest');
    // render
    await this.template.renderDir(srcDir, templateDir);
  }

  async _prepareResources_(context: IBinBuildRestContext) {
    // package.json
    await this._prepareResourcesPackage(context);
    // index.ts
    await this._prepareResourcesIndex(context);
  }

  _prepareBundleModules() {
    const modules: string[] = [];
    for (const module of this.modulesMeta.modulesArray) {
      const moduleRoot = module.root.replaceAll('\\', '/');
      if (moduleRoot.includes('/src/module/') || moduleRoot.includes('/src/suite/')) {
        modules.push(module.info.fullName);
      }
    }
    return modules;
  }

  async _buildTs({ srcDir, outDir }: IBinBuildRestContext) {
    // entry
    const entry = path.join(srcDir, 'index.ts');
    // build
    await build({
      entry: [entry],
      format: ['esm'],
      outDir,
      tsconfig: 'tsconfig.rest.json',
      plugins: [svgResolverPlugin()],
      deps: {
        alwaysBundle: (_id: string) => {
          return false;
        },
      },
      // minify: true,
    });
    const fileIndex = path.join(outDir, 'index.mjs');
    let fileContent = (await fse.readFile(fileIndex)).toString();
    fileContent = fileContent.replace(/import[\s\S]*?"[^"]*";/g, '').replace(/export[\s\S]*?"[^"]*";/g, '');
    await fse.writeFile(fileIndex, fileContent);
  }

  async _buildDts({ srcDir, outDir, bundleModules }: IBinBuildRestContext) {
    // entry
    const entry = path.join(srcDir, 'index.ts');
    // build
    await build({
      entry: [entry],
      format: ['esm'],
      outDir,
      tsconfig: 'tsconfig.rest.json',
      clean: false,
      dts: {
        // resolve: true,
        resolver: 'tsc',
        tsgo: true,
        eager: true,
        tsconfig: 'tsconfig.rest.json',
        emitDtsOnly: true,
      },
      plugins: [svgResolverPlugin()],
      deps: {
        alwaysBundle: (id: string) => {
          if (bundleModules!.includes(id)) return true;
          return false;
        },
      },
      // minify: true,
    });
  }

  async _build(buildContext: IBinBuildRestContext) {
    const { projectPath, flavor, bundleNameCopy, srcDir, outDir } = buildContext;
    // build
    await this._buildTs(buildContext);
    await this._buildDts(buildContext);
    // deps
    const deps = await _extractDeps(path.join(outDir, 'index.d.mts'));
    const depsVersion = await _extractDepsVersion(projectPath, deps);
    // package.json
    const pkgContent = await loadJSONFile(path.join(srcDir, 'package.json'));
    pkgContent.dependencies = depsVersion;
    await saveJSONFile(path.join(outDir, 'package.json'), pkgContent);
    // await fse.copyFile(path.join(srcDir, 'package.json'), path.join(outDir, 'package.json'));
    // release
    const outReleasesDir = path.join(projectPath, 'dist-releases', `rest-${flavor}-${process.env.APP_VERSION}`);
    await fse.copy(outDir, outReleasesDir);
    // copy
    _copyToTarget(outDir, process.env.BUILD_REST_COPY_DIST, bundleNameCopy);
  }

  async _prepareResourcesPackage({ projectPath, flavor, bundleName, srcDir }: IBinBuildRestContext) {
    const mode: ZovaMetaMode = 'production';
    const appMode: ZovaMetaAppMode = 'ssr';
    const configMeta: ZovaConfigMeta = { flavor, mode, appMode };
    const configOptions: ZovaViteConfigOptions = {
      appDir: projectPath,
      runtimeDir: '.zova',
    };
    const configUtils = createConfigUtils(configMeta, configOptions);
    // env
    const env = configUtils.loadEnvs();
    // package.json
    const pkgContent = replaceTemplate(__template_package, { Name: bundleName, Version: env.APP_VERSION });
    await fse.writeFile(path.join(srcDir, 'package.json'), pkgContent!);
  }

  async _prepareResourcesIndex({ srcDir, projectPath }: IBinBuildRestContext) {
    let indexContent = `import type { IIconRecord } from 'zova-module-a-icon';
export type { IIconRecord } from 'zova-module-a-icon';
import type { TypePagePathSchema } from 'zova-module-a-router';
export type { IPagePathRecord } from 'zova-module-a-router';
import type { IActionRecord, TypeActionOptions } from 'zova-module-a-action';
export type { IActionRecord } from 'zova-module-a-action';
import type { IVonaComponentRecord, TypeComponentOptions } from 'zova-module-a-bean';
export type { IVonaComponentRecord } from 'zova-module-a-bean';
export type {
  IResourceComponentActionBulkRecord,
  IResourceComponentActionRowRecord,
  IResourceComponentBlockRecord,
  IResourceComponentFormFieldRecord,
  IResourceComponentTableCellRecord,
  ISchemaRenderComponentLayoutOptions,
} from 'zova-module-a-openapi';
`;
    indexContent += await this._prepareResourcesIndex_rest(srcDir);
    indexContent += await this._prepareResourcesIndex_icons(srcDir);
    indexContent += await this._prepareResourcesIndex_pages(srcDir);
    indexContent += await this._prepareResourcesIndex_providers(srcDir, projectPath);
    await fse.writeFile(path.join(srcDir, 'index.ts'), indexContent);
  }

  async _prepareResourcesIndex_rest(srcDir: string) {
    let content = '';
    for (const module of this.modulesMeta.modulesArray) {
      const restDir = path.join(module.root, 'rest');
      if (!fse.existsSync(restDir)) continue;
      let tempDir;
      if (module.info.node_modules) {
        tempDir = path.join(srcDir, 'modules', module.info.relativeName, 'rest');
        await fse.copy(restDir, tempDir);
      } else {
        tempDir = path.join(module.root, 'rest');
      }
      const restIndexFile = path.join(tempDir, 'index.ts');
      let restIndexFileRelative = path.relative(srcDir, restIndexFile);
      if (!restIndexFileRelative.startsWith('.')) {
        restIndexFileRelative = `./${restIndexFileRelative}`;
      }
      content += `export * from '${restIndexFileRelative.replaceAll('\\', '/')}';\n`;
    }
    return content;
  }

  async _prepareResourcesIndex_icons(_srcDir: string) {
    const content = `export function $iconName<K extends keyof IIconRecord>(name: K): any {
  return name;
}
`;
    return content;
  }

  async _prepareResourcesIndex_providers(_srcDir: string, projectPath: string) {
    // openapi
    const dirBasicOpenapi = path.join(projectPath, './src/suite/cabloy-basic/modules/basic-openapi');
    const dirStartOpenapi = path.join(projectPath, './src/suite/cabloy-start/modules/start-openapi');
    let content = '';
    if (fse.existsSync(dirBasicOpenapi)) {
      content += `import 'zova-module-basic-openapi';\n`;
    } else if (fse.existsSync(dirStartOpenapi)) {
      content += `import 'zova-module-start-openapi';\n`;
    }
    // actions
    content += `export function Action<K extends keyof IActionRecord>(options: TypeActionOptions<K>) {
  if(!options.name) throw new Error('should specify the action name');
  return options.name.replace(':','.action.');
}
`;
    // components
    content += `export function Component<K extends keyof IVonaComponentRecord>(options: TypeComponentOptions<K>) {
  if (!options.name) throw new Error('should specify the component name');
  return options.name;
}
`;
    return content;
  }

  async _prepareResourcesIndex_pages(_srcDir: string) {
    const content = `declare module 'zova-module-a-router' {
  export interface IPagePathRecord {
    '/': TypePagePathSchema<undefined, undefined>;
    'presetLogin': TypePagePathSchema<undefined, undefined>;
    'presetErrorExpired': TypePagePathSchema<undefined, undefined>;
    'presetResource': TypePagePathSchema<undefined, undefined>;
  }
}
`;
    return content;
  }
}

function _copyToTarget(outDir: string, target: string | undefined, bundleNameCopy: string) {
  if (!target) return;
  const dirs = target.split(',');
  for (const dir of dirs) {
    const outReleasesDirCopy = path.join(dir, bundleNameCopy);
    fse.removeSync(outReleasesDirCopy);
    fse.copySync(outDir, outReleasesDirCopy, { preserveTimestamps: true });
  }
}

async function _extractDeps(filePath: string): Promise<string[]> {
  let content = (await fse.readFile(filePath)).toString();
  const pos = content.indexOf('//#region');
  content = content.substring(0, pos);
  const packageNames = new Set();
  const re = /import\s+[\s\S]*?\s+from\s+['"]([^'"]+)['"]/g;

  let match: any;
  while (true) {
    match = re.exec(content);
    if (!match) break;
    let pkg: string = match[1];
    if (pkg.startsWith('.') || pkg.startsWith('/')) continue;
    if (pkg.startsWith('@')) {
      if (pkg.split('/').length > 2) {
        pkg = pkg.split('/').slice(0, 2).join('/');
      }
    } else {
      if (pkg.split('/').length > 1) {
        pkg = pkg.split('/').slice(0, 1).join('/');
      }
    }
    packageNames.add(pkg);
  }
  return Array.from(packageNames).sort() as string[];
}

async function _extractDepsVersion(projectPath: string, deps: string[]) {
  const lockfilePath = path.join(projectPath, 'pnpm-lock.yaml');
  const lockfileContent = (await fse.readFile(lockfilePath)).toString();
  const parsedLockfile = yaml.parse(lockfileContent);
  const depsVersion = {};
  for (const dep of deps) {
    let version = getPackageVersionFromLock(parsedLockfile, dep);
    if (!version) {
      version = await getPackageVersionFromNodeModules(projectPath, dep);
    }
    if (!version) {
      console.warn('dep version not found: ', dep);
      continue;
    }
    depsVersion[dep] = `^${version}`;
  }
  return depsVersion;
}

function getPackageVersionFromLock(parsedLockfile: any, packageName: string) {
  const packages = parsedLockfile.packages || {};

  for (const key in packages) {
    if (key.startsWith(`${packageName}@`)) {
      return key.substring(`${packageName}@`.length);
    }
  }

  return null;
}

async function getPackageVersionFromNodeModules(projectPath: string, packageName: string) {
  const pkgFile = path.join(projectPath, 'node_modules', packageName, 'package.json');
  if (!fse.existsSync(pkgFile)) return null;
  const pkgContent = await loadJSONFile(pkgFile);
  return pkgContent.version;
}
