import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.js';
import path from 'node:path';

declare module '@cabloy/cli' {
  interface ICommandArgv {}
}

export class CliOpenapiGenerate extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // config file
    const configFile = path.join(argv.projectPath, 'openapi.config.ts');
    if (fse.existsSync(configFile)) {
      throw new Error('Please generate config first!');
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: argv.projectPath,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'openapi/config/boilerplate',
    });
  }
}
