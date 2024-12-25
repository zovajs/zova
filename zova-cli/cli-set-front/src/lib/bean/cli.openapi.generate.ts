import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.js';
import path from 'node:path';
import openapiTS, { astToString, OpenAPITSOptions } from 'openapi-typescript';
import ts from 'typescript';
import { toLowerCaseFirstChar } from '@cabloy/word-utils';

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
      const outputFile = path.join(argv.projectPath, 'src/suite/a-home/modules/home-api/src/service/_openapi_.ts');
      await fse.outputFile(outputFile, contents);
      await this.helper.formatFile({ fileName: outputFile });
      await this._generate(ast);
    });
  }

  async _generate(ast: ts.Node[]) {
    const { argv } = this.context;
    const nodeServices = this._getNodeServices(ast);
    if (!nodeServices) return;
    for (const serviceName in nodeServices) {
      const serviceNameLower = toLowerCaseFirstChar(serviceName);
      const nodeService = nodeServices[serviceName];
      const serviceFile = path.join(
        argv.projectPath,
        `src/suite/a-home/modules/home-api/src/service/${serviceNameLower}.ts`,
      );
      const serviceContent = this._generateService(ast, serviceName, nodeService);
      await fse.outputFile(serviceFile, serviceContent);
      await this.helper.formatFile({ fileName: serviceFile });
    }
  }

  _generateService(_ast: ts.Node[], _serviceName: string, _nodeService: Record<string, ts.PropertySignature>) {
    const serviceContent = "import { ZovaApplication } from 'zova';";
    return serviceContent;
  }

  _getNodeServices(ast: ts.Node[]) {
    const nodeOperations = ast.find(
      node => ts.isInterfaceDeclaration(node) && node.name.escapedText === 'operations',
    ) as ts.InterfaceDeclaration | undefined;
    if (!nodeOperations) return;
    const services: Record<string, Record<string, ts.PropertySignature>> = {};
    for (let index = 0; index < nodeOperations.members.length; index++) {
      const node = nodeOperations.members[index];
      if (!ts.isPropertySignature(node)) continue;
      const operationId = (<ts.Identifier>node.name).text;
      let [service, method] = operationId.toString().split('_');
      if (!method) {
        method = service;
        service = 'default';
      }
      if (!services[service]) {
        services[service] = {};
      }
      services[service][method] = node;
    }
    return services;
  }
}
