import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.js';
import path from 'node:path';

declare module '@cabloy/cli' {
  interface ICommandArgv {}
}

export class CliOpenapiConfig extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // target dir
    const configFile = path.join(argv.projectPath, 'openapi.config.ts');
    if (fse.existsSync(configFile)) {
      throw new Error(`config exists: ${configFile}`);
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
