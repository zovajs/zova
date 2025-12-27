import type { ZovaConfigMeta, ZovaMetaAppMode, ZovaMetaFlavor, ZovaMetaMode } from '@cabloy/module-info';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import { replaceTemplate } from '@cabloy/word-utils';
import { rimraf } from 'rimraf';
import { createConfigUtils, type ZovaViteConfigOptions } from 'zova-vite';
import fse from 'fs-extra';

const __template_package = `{
  "name": "{{Name}}",
  "version": "{{Version}}",
  "type": "module"
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
    await this._prepareWorkDir(projectPath);
  }

  async _prepareWorkDir(projectPath: string) {
    const { argv } = this.context;
    const outDir = path.join(projectPath, '.zova-rest');
    await rimraf(outDir);
    await this.helper.ensureDir(outDir);
    //
    const mode: ZovaMetaMode = 'production';
    const flavor: ZovaMetaFlavor = argv.flavor || 'vonaHome';
    const appMode:ZovaMetaAppMode='ssr';
    const configMeta: ZovaConfigMeta = { flavor, mode, appMode};
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
      { name: flavor, version: env.APP_VERSION },
    );
    await fse.writeFile(path.join(outDir,'package.json'), pkgContent!);
  }
}
