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

interface INodeMethodInfo {
  serviceName: string;
  serviceNameLower: string;
  methodName: string;
  operationId: string;
  node: ts.PropertySignature;
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
      const serviceContent = this._generateService(ast, nodeService);
      await fse.outputFile(serviceFile, serviceContent);
      await this.helper.formatFile({ fileName: serviceFile });
    }
  }

  _generateMethod(_ast: ts.Node[], nodeMethodInfo: INodeMethodInfo) {
    // names
    // const _nameRequestPath = '';
    // const _nameRequestMethod = '';
    const nameRequestParams = '';
    const nameRequestQuery = '';
    const nameRequestHeaders = '';
    const nameRequestBody = '';
    // const _nameResponseBody = '';
    // content
    const contentTypes = [''];
    const contentRequestMethod = this._getRequestMethodValue(_ast, nodeMethodInfo);
    const contentRequestBody = ['get', 'delete'].includes(contentRequestMethod) ? '' : `body: ${nameRequestBody},`;
    const contentOptions = [];
    const contentOptions2 =
      nameRequestParams || nameRequestQuery || nameRequestHeaders
        ? `
    options?: {
        ${contentOptions.join('\n')}
      },
    `
        : '';
    const contentSignature = `${nodeMethodInfo.methodName}: (
      ${contentRequestBody}
      ${contentOptions2}
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),`;
    return [contentTypes.join('\n'), contentSignature];
  }

  _getNodePath(_ast: ts.Node[], _nodeMethodInfo: INodeMethodInfo) {}

  _getRequestMethodValue(_ast: ts.Node[], _nodeMethodInfo: INodeMethodInfo) {
    return 'post';
  }

  _generateService(ast: ts.Node[], nodeService: Record<string, INodeMethodInfo>) {
    const contentTypes: string[] = [];
    const contentSignatures: string[] = [];
    for (const methodName in nodeService) {
      const nodeMethodInfo = nodeService[methodName];
      const contentMethod = this._generateMethod(ast, nodeMethodInfo);
      contentTypes.push(contentMethod[0]);
      contentSignatures.push(contentMethod[1]);
    }
    const serviceContent = `import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';

${contentTypes.join('\n')}

export default (app: ZovaApplication) => {
  return {
    ${contentSignatures.join('\n')}
  };
};
`;
    return serviceContent;
  }

  _getNodeServices(ast: ts.Node[]) {
    const nodeOperations = ast.find(
      node => ts.isInterfaceDeclaration(node) && node.name.escapedText === 'operations',
    ) as ts.InterfaceDeclaration | undefined;
    if (!nodeOperations) return;
    const services: Record<string, Record<string, INodeMethodInfo>> = {};
    for (let index = 0; index < nodeOperations.members.length; index++) {
      const node = nodeOperations.members[index];
      if (!ts.isPropertySignature(node)) continue;
      const operationId = (<ts.Identifier>node.name).text;
      let [serviceName, methodName] = operationId.toString().split('_');
      if (!methodName) {
        methodName = serviceName;
        serviceName = 'default';
      }
      if (!services[serviceName]) {
        services[serviceName] = {};
      }
      services[serviceName][methodName] = {
        serviceName,
        serviceNameLower: toLowerCaseFirstChar(serviceName),
        methodName,
        operationId,
        node,
      };
    }
    return services;
  }
}
