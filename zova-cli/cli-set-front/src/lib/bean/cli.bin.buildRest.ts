import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    workers?: number;
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
    const outDir = path.join(projectPath, '.zova-rest');
    // package.json
  }
}
