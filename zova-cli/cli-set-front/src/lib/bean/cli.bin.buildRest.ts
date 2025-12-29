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

export class CliBinBuildRest extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    //
    const srcDir = path.join(projectPath, '.zova-rest');
    const outDir = path.join(projectPath, 'dist', `rest-${this.flavor}`);
    await rimraf(srcDir);
    await fse.ensureDir(srcDir);
    await rimraf(outDir);
    //
    await this._prepareResources(projectPath, srcDir);
    await this._build(projectPath, srcDir, outDir);
    //
    await rimraf(srcDir);
  }

  get flavor(): ZovaMetaFlavor {
    const { argv } = this.context;
    return argv.flavor || 'vonaHome';
  }

  get bundleName() {
    return `zova-rest-${camelToKebab(this.flavor)}`;
  }

  async _prepareResources(projectPath: string, srcDir: string) {
    // package.json
    await this._prepareResourcesPackage(projectPath, srcDir);
    // index.ts
    await this._prepareResourcesIndex(projectPath, srcDir);
  }

  async _build(projectPath: string, srcDir: string, outDir: string) {
    const entry = path.join(srcDir, 'index.ts');
    // build
    await build({
      entry: [entry],
      format: ['esm'],
      outDir,
      tsconfig: 'tsconfig.rest.json',
      dts: {
        resolve: true,
        // resolver: 'tsc',
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
    await fse.copy(
      outDir,
      path.join(path.join(projectPath, 'dist-releases', `rest-${this.flavor}-${process.env.APP_VERSION}`)),
    );
  }

  async _prepareResourcesPackage(projectPath: string, srcDir: string) {
    const mode: ZovaMetaMode = 'production';
    const flavor: ZovaMetaFlavor = this.flavor;
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
      { Name: this.bundleName, Version: env.APP_VERSION },
    );
    await fse.writeFile(path.join(srcDir, 'package.json'), pkgContent!);
  }

  async _prepareResourcesIndex(_projectPath: string, srcDir: string) {
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
