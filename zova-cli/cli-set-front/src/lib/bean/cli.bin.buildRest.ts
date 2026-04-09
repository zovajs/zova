import type { ZovaConfigMeta, ZovaMetaAppMode, ZovaMetaFlavor, ZovaMetaMode } from '@cabloy/module-info';
import type { ZovaViteConfigOptions } from 'zova-vite';

import { BeanCliBase } from '@cabloy/cli';
import { camelToKebab, replaceTemplate } from '@cabloy/word-utils';
import fse from 'fs-extra';
import path from 'node:path';
import { rimraf } from 'rimraf';
import { build } from 'tsdown';
import { createConfigUtils } from 'zova-vite';

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
  }
}

interface IBinBuildRestContext {
  projectPath: string;
  flavor: ZovaMetaFlavor;
  bundleName: string;
  bundleNameCopy: string;
  srcDir: string;
  outDir: string;
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
    // package.json
    await this._prepareResourcesPackage(context);
    // index.ts
    await this._prepareResourcesIndex(context);
  }

  async _build({ projectPath, flavor, bundleNameCopy, srcDir, outDir }: IBinBuildRestContext) {
    const entry = path.join(srcDir, 'index.ts');
    // build
    await build({
      entry: [entry],
      format: ['esm'],
      outDir,
      tsconfig: 'tsconfig.rest.json',
      dts: {
        resolve: true,
        resolver: 'tsc',
        tsgo: true,
        eager: true,
        tsconfig: 'tsconfig.rest.json',
      },
      plugins: [svgResolverPlugin()],
    });
    // package.json
    await fse.copyFile(path.join(srcDir, 'package.json'), path.join(outDir, 'package.json'));
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

  async _prepareResourcesIndex({ srcDir }: IBinBuildRestContext) {
    let indexContent = '';
    indexContent += await this._prepareResourcesIndex_rest(srcDir);
    indexContent += await this._prepareResourcesIndex_icons(srcDir);
    indexContent += await this._prepareResourcesIndex_pages(srcDir);
    await fse.writeFile(path.join(srcDir, 'index.ts'), indexContent);
  }

  async _prepareResourcesIndex_rest(srcDir: string) {
    let content = '';
    for (const module of this.modulesMeta.modulesArray) {
      const restIndexFile = path.join(module.root, 'rest/index.ts');
      if (!fse.existsSync(restIndexFile)) continue;
      const restIndexFileRelative = path.relative(srcDir, restIndexFile);
      content += `export * from '${restIndexFileRelative}';\n`;
    }
    return content;
  }

  async _prepareResourcesIndex_icons(_srcDir: string) {
    let content = '';
    for (const module of this.modulesMeta.modulesArray) {
      const restIconsFile = path.join(module.root, 'rest/icons.txt');
      if (!fse.existsSync(restIconsFile)) continue;
      const contentIcons = (await fse.readFile(restIconsFile)).toString();
      content += `${contentIcons}\n`;
    }
    if (content) {
      content = `export interface IIconRecord {
${content}
}
export function $iconName<K extends keyof IIconRecord>(name: K): any {
  return name;
}
`;
    }
    return content;
  }

  async _prepareResourcesIndex_pages(_srcDir: string) {
    let contentImport = '';
    let contentRecord = '';
    for (const module of this.modulesMeta.modulesArray) {
      const restPagesRecordFile = path.join(module.root, 'rest/pagesRecord.txt');
      if (!fse.existsSync(restPagesRecordFile)) continue;
      const restPagesImportFile = path.join(module.root, 'rest/pagesImport.txt');
      const contentPagesImport = (await fse.readFile(restPagesImportFile)).toString();
      const contentPagesRecord = (await fse.readFile(restPagesRecordFile)).toString();
      contentImport += `${contentPagesImport}\n`;
      contentRecord += `${contentPagesRecord}\n`;
    }
    let content = '';
    if (contentRecord) {
      content = `${contentImport}
export interface TypePagePathSchema<PARAMS = unknown, QUERY = unknown> {
  params?: PARAMS;
  query?: QUERY;
}
export interface IPagePathRecord {
${contentRecord}
'/': TypePagePathSchema<undefined,undefined>;
presetLogin: TypePagePathSchema<undefined,undefined>;
presetErrorExpired: TypePagePathSchema<undefined,undefined>;
presetResource: TypePagePathSchema<undefined,undefined>;
}
`;
    }
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
