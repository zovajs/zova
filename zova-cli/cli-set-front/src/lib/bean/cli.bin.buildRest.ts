import type { ZovaConfigMeta, ZovaMetaAppMode, ZovaMetaFlavor, ZovaMetaMode } from '@cabloy/module-info';
import type { ZovaViteConfigOptions } from 'zova-vite';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import { replaceTemplate } from '@cabloy/word-utils';
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
    await this._prepareResources(projectPath);
    await this._build(projectPath);
  }

  get flavor(): ZovaMetaFlavor {
    const { argv } = this.context;
    return argv.flavor || 'vonaHome';
  }

  async _prepareResources(projectPath: string) {
    const outDir = path.join(projectPath, '.zova-rest');
    await rimraf(outDir);
    await this.helper.ensureDir(outDir);
    // package.json
    await this._prepareResourcesPackage(projectPath, outDir);
    // index.ts
    await this._prepareResourcesIndex(projectPath, outDir);
  }

  async _build(projectPath: string) {
    const entry = path.join(projectPath, '.zova-rest', 'index.ts');
    const outDir = path.join(projectPath, 'dist', `rest-${this.flavor}`);
    await rimraf(outDir);
    await build({
      entry: [entry],
      format: ['esm'],
      outDir,
      dts: {
        resolve: true,
        resolver: 'tsc',
      },
    });
    await fse.copyFile(
      path.join(projectPath, '.zova-rest', 'package.json'),
      path.join(outDir, 'package.json'),
    );
    // release
    await fse.copy(
      outDir,
      path.join(path.join(projectPath, 'dist-releases', `rest-${this.flavor}-${process.env.APP_VERSION}`)),
    );
  }

  async _prepareResourcesPackage(projectPath: string, outDir: string) {
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
      { Name: flavor, Version: env.APP_VERSION },
    );
    await fse.writeFile(path.join(outDir, 'package.json'), pkgContent!);
  }

  async _prepareResourcesIndex(_projectPath: string, outDir: string) {
    let indexContent = '';
    for (const module of this.modulesMeta.modulesArray) {
      const restIndexFile = path.join(module.root, 'rest/index.ts');
      if (!fse.existsSync(restIndexFile)) continue;
      const restIndexFileRelative = path.relative(outDir, restIndexFile);
      indexContent += `import '${restIndexFileRelative}';\n`;
    }
    await fse.writeFile(path.join(outDir, 'index.ts'), indexContent);
  }
}
