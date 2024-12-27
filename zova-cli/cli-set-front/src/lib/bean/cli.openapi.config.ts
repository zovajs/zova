import { BeanCliBase } from '@cabloy/cli';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {}
}

export class CliOpenapiConfig extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const moduleNames = argv._;
    if (moduleNames.length === 0) {
      moduleNames.push('home-api');
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: argv.projectPath,
      setName: __ThisSetName__,
      snippetsPath: 'openapi/config/snippets',
      boilerplatePath: null,
    });
  }
}
