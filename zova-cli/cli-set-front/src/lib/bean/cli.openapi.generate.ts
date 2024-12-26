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

  _generateMethod(ast: ts.Node[], nodeMethodInfo: INodeMethodInfo) {
    // pathInfo
    const pathInfo = this._getRequestPathInfo(ast, nodeMethodInfo);
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
    const contentRequestMethod = pathInfo.method;
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

  _getRequestPathInfo(ast: ts.Node[], nodeMethodInfo: INodeMethodInfo) {
    const nodePaths = ast.find(node => ts.isInterfaceDeclaration(node) && node.name.text === 'paths') as
      | ts.InterfaceDeclaration
      | undefined;
    if (!nodePaths) throw new Error('paths not found');
    let path;
    let method;
    const nodePath = nodePaths.members.find(node => {
      if (!ts.isPropertySignature(node)) return false;
      if (!node.type || !ts.isTypeLiteralNode(node.type)) return false;
      path = (<ts.StringLiteral>node.name).text;
      const nodeMethod = node.type.members.find(item => {
        if (!ts.isPropertySignature(item)) return false;
        if (!item.type || !ts.isIndexedAccessTypeNode(item.type)) return false;
        const operationId = (<ts.StringLiteral>(<ts.LiteralTypeNode>item.type.indexType).literal).text;
        if (operationId !== nodeMethodInfo.operationId) return false;
        method = (<ts.Identifier>item.name).text;
        return true;
      });
      return !!nodeMethod;
    }) as ts.PropertySignature | undefined;
    if (!nodePath) throw new Error('path not found');
    return { path, method, nodePath };
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
    const nodeOperations = ast.find(node => ts.isInterfaceDeclaration(node) && node.name.text === 'operations') as
      | ts.InterfaceDeclaration
      | undefined;
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
