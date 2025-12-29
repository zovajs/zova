import type { ZovaConfigMeta, ZovaMetaAppMode, ZovaMetaFlavor, ZovaMetaMode } from '@cabloy/module-info';
import type { ZovaViteConfigOptions } from 'zova-vite';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import { camelToKebab, replaceTemplate } from '@cabloy/word-utils';
import fse from 'fs-extra';
import { rimraf } from 'rimraf';
import { build } from 'tsdown';
import { createConfigUtils } from 'zova-vite';

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
    const flavor = argv.flavor || 'vonaHome';
    const bundleName = `zova-rest-${camelToKebab(flavor)}`;
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

  async _build({ projectPath, flavor, srcDir, outDir }: IBinBuildRestContext) {
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
    });
    // package.json
    await fse.copyFile(
      path.join(srcDir, 'package.json'),
      path.join(outDir, 'package.json'),
    );
    // release
    const outReleasesDir = path.join(projectPath, 'dist-releases', `rest-${flavor}-${process.env.APP_VERSION}`);
    await fse.copy(outDir, outReleasesDir);
    // copy
    _copyToTarget(outDir, process.env.BUILD_REST_COPY_DIST, path.basename(outDir));
    _copyToTarget(outDir, process.env.BUILD_REST_COPY_RELEASE, path.basename(outReleasesDir));
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
    const pkgContent = replaceTemplate(
      __template_package,
      { Name: bundleName, Version: env.APP_VERSION },
    );
    await fse.writeFile(path.join(srcDir, 'package.json'), pkgContent!);
  }

  async _prepareResourcesIndex({ srcDir }: IBinBuildRestContext) {
    let indexContent = '';
    for (const module of this.modulesMeta.modulesArray) {
      const restIndexFile = path.join(module.root, 'rest/index.ts');
      if (!fse.existsSync(restIndexFile)) continue;
      const restIndexFileRelative = path.relative(srcDir, restIndexFile);
      indexContent += `export * from '${restIndexFileRelative}';\n`;
    }
    await fse.writeFile(path.join(srcDir, 'index.ts'), indexContent);
  }
}

function _copyToTarget(outDir: string, target: string | undefined, basename: string) {
  if (!target) return;
  if (basename.includes('rest-')) {
    basename = basename.substring('rest-'.length);
  }
  const dirs = target.split(',');
  for (const dir of dirs) {
    const outReleasesDirCopy = path.join(dir, basename);
    fse.removeSync(outReleasesDirCopy);
    fse.copySync(
      outDir,
      outReleasesDirCopy,
    );
  }
}
