import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.js';
import path from 'node:path';
import openapiTS, { astToString, OpenAPITSOptions } from 'openapi-typescript';
import ts from 'typescript';

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
    if (!fse.existsSync(configFile)) {
      throw new Error('Please generate config first!');
    }
    await this.helper.importDynamic(configFile, async instance => {
      const config = (await instance.default()) as { source: string; options: OpenAPITSOptions };
      const ast = await openapiTS(config.source, config.options);
      const contents = astToString(ast);
      const outputFile = path.join(argv.projectPath, 'src/suite/a-home/modules/home-api/src/service/.openapi.ts');
      await fse.outputFile(outputFile, contents);
      await this._generate(ast);
    });
  }

  async _generate(ast: ts.Node[]) {
    console.log(ast);
  }
}
