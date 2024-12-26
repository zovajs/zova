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

interface INodeActionInfo {
  service: string;
  serviceLower: string;
  action: string;
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

  _generateAction(ast: ts.Node[], nodeActionInfo: INodeActionInfo) {
    // pathInfo
    const pathInfo = this._getRequestPathInfo(ast, nodeActionInfo);
    // contentTypes
    const contentTypes: string[] = [];
    contentTypes.push(`/** ${nodeActionInfo.operationId} */`);
    // name: path
    const nameRequestPath = `Service${nodeActionInfo.service}${nodeActionInfo.action}Path`;
    contentTypes.push(`export const ${nameRequestPath} = '${pathInfo.path}';`);
    contentTypes.push(`export type ${nameRequestPath} = '${pathInfo.path}' `);
    // name: method
    const nameRequestMethod = `Service${nodeActionInfo.service}${nodeActionInfo.action}Method`;
    contentTypes.push(`export type ${nameRequestMethod} = '${pathInfo.method}';`);
    // name: params
    const nameRequestParams = '';
    const nameRequestQuery = '';
    const nameRequestHeaders = '';
    const nameRequestBody = '';
    // const _nameResponseBody = '';
    // content
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
    const contentSignature = `${nodeActionInfo.action}: (
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

  _getRequestPathInfo(ast: ts.Node[], nodeActionInfo: INodeActionInfo) {
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
        if (operationId !== nodeActionInfo.operationId) return false;
        method = (<ts.Identifier>item.name).text;
        return true;
      });
      return !!nodeMethod;
    }) as ts.PropertySignature | undefined;
    if (!nodePath) throw new Error('path not found');
    return { path, method, nodePath };
  }

  _generateService(ast: ts.Node[], nodeService: Record<string, INodeActionInfo>) {
    const contentTypes: string[] = [];
    const contentSignatures: string[] = [];
    for (const actionName in nodeService) {
      const nodeActionInfo = nodeService[actionName];
      const contentAction = this._generateAction(ast, nodeActionInfo);
      contentTypes.push(contentAction[0]);
      contentSignatures.push(contentAction[1]);
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
    const services: Record<string, Record<string, INodeActionInfo>> = {};
    for (let index = 0; index < nodeOperations.members.length; index++) {
      const node = nodeOperations.members[index];
      if (!ts.isPropertySignature(node)) continue;
      const operationId = (<ts.Identifier>node.name).text;
      let [service, action] = operationId.toString().split('_');
      if (!action) {
        action = service;
        service = 'default';
      }
      if (!services[service]) {
        services[service] = {};
      }
      services[service][action] = {
        service,
        serviceLower: toLowerCaseFirstChar(service),
        action,
        operationId,
        node,
      };
    }
    return services;
  }
}
