import type { IModule, IModuleInfo } from '@cabloy/module-info';
import type { ZovaOpenapiConfig, ZovaOpenapiConfigModule } from 'zova-openapi';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import { extend } from '@cabloy/extend';
import { matchSelector, toLowerCaseFirstChar, toUpperCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

declare module '@cabloy/cli' {
  interface ICommandArgv {}
}

interface INodeActionInfo {
  api: string;
  apiLower: string;
  action: string;
  operationId: string;
  node: ts.PropertySignature;
  nodeTypeInfo: TypeNodeTypeInfo;
}

interface INodeTypeInfoItem {
  question: boolean;
  nodeType: ts.TypeLiteralNode;
}
type TypeNodeTypeInfo = Record<string, INodeTypeInfoItem>;

interface IAstCache {
  ast: ts.Node[];
  contents: string;
}
type TypeAstCaches = Record<string, IAstCache>;

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
      const config = (await instance.default()) as ZovaOpenapiConfig;
      const moduleNames = this._prepareModuleNames(config);
      if (moduleNames.length === 0) {
        throw new Error('Please generate config first!');
      }
      const total = moduleNames.length;
      const __caches: TypeAstCaches = {};
      for (let index = 0; index < total; index++) {
        const moduleName = moduleNames[index];
        // log
        await this.console.log({
          total,
          progress: index,
          text: moduleName,
        });
        // generate res
        const moduleInfo = this.helper.parseModuleInfo(moduleName);
        const module = this.helper.findModule(moduleName);
        await this._generateOpenapi(config, moduleInfo, module, __caches);
      }
    });
  }

  _prepareModuleNames(config: ZovaOpenapiConfig) {
    const { argv } = this.context;
    const moduleNames = argv._;
    if (moduleNames.length === 0) {
      return Object.keys(config.modules);
    }
    return Object.keys(config.modules).filter(item => moduleNames.includes(item));
  }

  async _generateOpenapi(config: ZovaOpenapiConfig, moduleInfo: IModuleInfo, module: IModule, __caches: TypeAstCaches) {
    const { argv } = this.context;
    const moduleConfig = extend(true, {}, config.default, config.modules[moduleInfo.relativeName]);
    const cache = await this._outputFiles(moduleConfig, moduleInfo, module, __caches);
    // generate
    await this._generateApis(cache.ast, moduleConfig, moduleInfo, module);
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleInfo.relativeName], { cwd: argv.projectPath });
  }

  async _outputFiles(
    moduleConfig: ZovaOpenapiConfigModule,
    _moduleInfo: IModuleInfo,
    module: IModule,
    __caches: TypeAstCaches,
  ) {
    if (!moduleConfig.source) throw new Error('source not found');
    // cache
    let cache = __caches[moduleConfig.source];
    if (!cache) {
      const ast = await openapiTS(moduleConfig.source, moduleConfig.options);
      const contents = astToString(ast);
      cache = __caches[moduleConfig.source] = { ast, contents };
    }
    // output: openapi/types.ts
    const outputFile = path.join(module.root, 'src/api/openapi/types.ts');
    await fse.outputFile(outputFile, cache.contents);
    await this.helper.formatFile({ fileName: outputFile });
    // output: openapi/schemas.ts
    const schemasFile = path.join(module.root, 'src/api/openapi/schemas.ts');
    const contentSchemas = this._generateSchemas(cache.ast);
    await fse.outputFile(schemasFile, contentSchemas || 'export {}');
    await this.helper.formatFile({ fileName: schemasFile });
    // output: openapi/baseURL.ts
    const baseURLFile = path.join(module.root, 'src/api/openapi/baseURL.ts');
    await fse.outputFile(baseURLFile, `export const ApiBaseURL = '${moduleConfig.baseURL || ''}';`);
    await this.helper.formatFile({ fileName: baseURLFile });
    // output: openapi/index.ts
    const indexFile = path.join(module.root, 'src/api/openapi/index.ts');
    await fse.outputFile(
      indexFile,
      "export * from './baseURL.js';\nexport * from './schemas.js';\nexport * from './types.js';",
    );
    await this.helper.formatFile({ fileName: indexFile });
    return cache;
  }

  _generateSchemas(ast: ts.Node[]) {
    const nodeComponents = ast.find(node => ts.isInterfaceDeclaration(node) && node.name.text === 'components') as
      | ts.InterfaceDeclaration
      | undefined;
    if (!nodeComponents) return '';
    const nodeTypeInfoComponents = _parseNodeType(nodeComponents)!;
    if (!nodeTypeInfoComponents.schemas) return '';
    const nodeTypeInfoSchemas = _parseNodeType(nodeTypeInfoComponents.schemas.nodeType)!;
    const typeSchemas: string[] = [];
    for (const key in nodeTypeInfoSchemas) {
      const schemaName =
        `ApiSchema${
          key
            .replaceAll('.', '-')
            .split('-')
            .map(item => toUpperCaseFirstChar(item))
            .join('')}`;
      typeSchemas.push(`export type ${schemaName} = components["schemas"]["${key}"];`);
    }
    let contentSchemas = typeSchemas.join('\n');
    if (contentSchemas.includes('components["schemas"]')) {
      contentSchemas = `import type { components } from './types.js';\n${contentSchemas}`;
    }
    return contentSchemas;
  }

  async _generateApis(
    ast: ts.Node[],
    moduleConfig: ZovaOpenapiConfigModule,
    _moduleInfo: IModuleInfo,
    module: IModule,
  ) {
    const nodeApis = this._getNodeApis(ast, moduleConfig);
    if (!nodeApis) return;
    for (const apiName in nodeApis) {
      const apiNameLower = toLowerCaseFirstChar(apiName);
      const nodeApi = nodeApis[apiName];
      const apiFile = path.join(module.root, `src/api/${apiNameLower}.ts`);
      const apiContent = this._generateApi(ast, apiName, nodeApi);
      await fse.outputFile(apiFile, apiContent);
      await this.helper.formatFile({ fileName: apiFile });
    }
  }

  _generateAction(ast: ts.Node[], nodeActionInfo: INodeActionInfo) {
    // pathInfo
    const pathInfo = _getRequestPathInfo(ast, nodeActionInfo);
    // contentTypes
    const contentTypes: string[] = [];
    contentTypes.push(`\n/** ${nodeActionInfo.operationId} */`);
    // name: ApiAction
    const nameApiAction = `Api${nodeActionInfo.api}${nodeActionInfo.action}`;
    // name: path
    const nameRequestPath = `Api${nameApiAction}Path`;
    contentTypes.push(`export const ${nameRequestPath} = '${pathInfo.path}';`);
    contentTypes.push(`export type ${nameRequestPath} = '${pathInfo.path}' `);
    // name: method
    const nameRequestMethod = `Api${nameApiAction}Method`;
    contentTypes.push(`export type ${nameRequestMethod} = '${pathInfo.method}';`);
    // name: params/query/headers
    const parametersInfo: Record<string, { name: string; question: boolean }> = {};
    const nodeTypeInfoParameters = _parseNodeType(nodeActionInfo.nodeTypeInfo.parameters.nodeType)!;
    for (const key of ['path', 'query', 'header']) {
      if (_isNodeNever(nodeTypeInfoParameters[key].nodeType)) continue;
      const key2 = key === 'path' ? 'params' : key === 'header' ? 'headers' : key;
      const key2Upper = toUpperCaseFirstChar(key2);
      const info = {
        name: `Api${nameApiAction}Request${key2Upper}`,
        question: nodeTypeInfoParameters[key].question,
      };
      parametersInfo[key2] = info;
      contentTypes.push(
        `export type ${info.name} = paths[${nameRequestPath}][${nameRequestMethod}]['parameters']['${key}'];`,
      );
    }
    // name: request body
    let nameRequestBody = '';
    let nameRequestBodyQuestion: boolean = true;
    if (!_isNodeNever(nodeActionInfo.nodeTypeInfo.requestBody.nodeType)) {
      nameRequestBody = `Api${nameApiAction}RequestBody`;
      nameRequestBodyQuestion = nodeActionInfo.nodeTypeInfo.requestBody.question;
      const nodeRequestBodyInfo = _parseNodeType(nodeActionInfo.nodeTypeInfo.requestBody.nodeType)!;
      const nodeRequestBodyContentInfo = _parseNodeType(nodeRequestBodyInfo.content.nodeType)!;
      const nodeRequestBodyApplicationJson = nodeRequestBodyContentInfo['application/json'];
      const typeRequestBody = astToString(nodeRequestBodyApplicationJson.nodeType);
      contentTypes.push(`export type ${nameRequestBody} = ${typeRequestBody};`);
    }
    // name: response body
    const nameResponseBody = `Api${nameApiAction}ResponseBody`;
    contentTypes.push(
      `export type ${nameResponseBody} = paths[${nameRequestPath}][${nameRequestMethod}]['responses']['200']['content']['application/json']['data'];`,
    );
    // content: options
    const contentOptions: string[] = [];
    let contentOptionsQuestion: boolean = true;
    for (const key of ['params', 'query', 'headers']) {
      const info = parametersInfo[key];
      if (!info) continue;
      if (!info.question) contentOptionsQuestion = false;
      contentOptions.push(`${key}${_q(info.question)}: ${info.name};`);
    }
    const contentOptions2 =
      contentOptions.length > 0
        ? `options${_q(contentOptionsQuestion)}: {\n${contentOptions.join('\n')}\n} & IApiActionOptions,`
        : `options${_q(contentOptionsQuestion)}: IApiActionOptions,`;
    // content: request body
    let contentRequestBody = '';
    if (!['get', 'delete'].includes(pathInfo.method)) {
      if (!nameRequestBody) {
        contentRequestBody = `body${_q(contentOptionsQuestion)}: undefined,`;
      } else {
        if (nameRequestBodyQuestion) {
          contentRequestBody = `body${_q(contentOptionsQuestion)}: ${nameRequestBody} | undefined,`;
        } else {
          contentRequestBody = `body: ${nameRequestBody},`;
        }
      }
    }
    // content: path translate
    const contentPathTranslate = parametersInfo.params
      ? `this.$pathTranslate(${nameRequestPath}, options${_q(contentOptionsQuestion)}.params),`
      : `${nameRequestPath},`;
    // content: comment
    const contentComments =
      pathInfo.comments && pathInfo.comments.length > 0 ? `/*${pathInfo.comments.join()}*/\n` : '';
    // content: signature
    const contentSignature = `${contentComments}${nodeActionInfo.action}(
      ${contentRequestBody}
      ${contentOptions2}
    ) {
      return this.$fetch.${pathInfo.method}<any, ${nameResponseBody}>(
        ${contentPathTranslate} ${contentRequestBody ? 'body,' : ''} 
        this.$configPrepare(ApiBaseURL, options),
      );
    }\n`;
    return [contentTypes.join('\n'), contentSignature];
  }

  _generateApi(ast: ts.Node[], apiName: string, nodeApi: Record<string, INodeActionInfo>) {
    const contentTypes: string[] = [];
    const contentSignatures: string[] = [];
    for (const actionName in nodeApi) {
      const nodeActionInfo = nodeApi[actionName];
      const contentAction = this._generateAction(ast, nodeActionInfo);
      contentTypes.push(contentAction[0]);
      contentSignatures.push(contentAction[1]);
    }
    const contentTypes2 = contentTypes.join('\n');
    const importsType: string[] = [];
    if (contentSignatures.length > 0) importsType.push('ApiBaseURL');
    if (contentTypes2.includes('components["schemas"]')) importsType.push('type components');
    if (contentTypes2.includes('paths[')) importsType.push('type paths');
    const contentImportsType =
      importsType.length > 0 ? `import { ${importsType.join(', ')} } from './openapi/index.js';` : '';
    const apiContent = `import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
${contentImportsType}

${contentTypes2}

@Api()
export class Api${apiName} extends BeanApiBase {
  ${contentSignatures.join('\n')}
}
`;
    return apiContent;
  }

  _getNodeApis(ast: ts.Node[], moduleConfig: ZovaOpenapiConfigModule) {
    const nodeOperations = ast.find(node => ts.isInterfaceDeclaration(node) && node.name.text === 'operations') as
      | ts.InterfaceDeclaration
      | undefined;
    if (!nodeOperations) return;
    const apis: Record<string, Record<string, INodeActionInfo>> = {};
    for (let index = 0; index < nodeOperations.members.length; index++) {
      const node = nodeOperations.members[index];
      if (!ts.isPropertySignature(node)) continue;
      const operationId = (node.name as ts.Identifier).text;
      if (!_checkOperationIdEnabled(moduleConfig, operationId)) continue;
      let [api, action] = operationId.toString().split('_');
      if (!action) {
        action = api;
        api = 'default';
      }
      if (!apis[api]) {
        apis[api] = {};
      }
      apis[api][action] = {
        api,
        apiLower: toLowerCaseFirstChar(api),
        action,
        operationId,
        node,
        nodeTypeInfo: _parseNodeType(node.type as ts.TypeLiteralNode)!,
      };
    }
    return apis;
  }
}

function _getRequestPathInfo(ast: ts.Node[], nodeActionInfo: INodeActionInfo) {
  const nodePaths = ast.find(node => ts.isInterfaceDeclaration(node) && node.name.text === 'paths') as
    | ts.InterfaceDeclaration
    | undefined;
  if (!nodePaths) throw new Error('paths not found');
  let path;
  let method;
  let comments;
  const nodePath = nodePaths.members.find(node => {
    if (!ts.isPropertySignature(node)) return false;
    if (!node.type || !ts.isTypeLiteralNode(node.type)) return false;
    path = (node.name as ts.StringLiteral).text;
    const nodeMethod = node.type.members.find(item => {
      if (!ts.isPropertySignature(item)) return false;
      if (!item.type || !ts.isIndexedAccessTypeNode(item.type)) return false;
      const operationId = ((item.type.indexType as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
      if (operationId !== nodeActionInfo.operationId) return false;
      method = (item.name as ts.Identifier).text;
      // comment
      const nodeComments = (item as any).emitNode?.leadingComments;
      if (nodeComments) {
        comments = nodeComments.map(nodeComment => nodeComment.text);
      }
      return true;
    });
    return !!nodeMethod;
  }) as ts.PropertySignature | undefined;
  if (!nodePath) throw new Error('path not found');
  return { path, method, comments, nodePath };
}

function _parseNodeType(nodeType?: ts.TypeLiteralNode | ts.InterfaceDeclaration) {
  if (!nodeType) return;
  const nodeTypeInfo: TypeNodeTypeInfo = {};
  nodeType.members.forEach(node => {
    if (!ts.isPropertySignature(node)) return;
    const name = (node.name as ts.Identifier).text;
    const value = node.type as ts.TypeLiteralNode;
    nodeTypeInfo[name] = {
      question: !!node.questionToken,
      nodeType: value,
    };
  });
  return nodeTypeInfo;
}

function _isNodeNever(node: ts.Node) {
  return node.kind === ts.SyntaxKind.NeverKeyword;
}

function _q(question: boolean) {
  return question ? '?' : '';
}

function _checkOperationIdEnabled(moduleConfig: ZovaOpenapiConfigModule, selector?: string) {
  if (!selector) return false;
  if (!moduleConfig.match && !moduleConfig.ignore) return true;
  return (
    (moduleConfig.match && matchSelector(moduleConfig.match, selector)) ||
    (moduleConfig.ignore && !matchSelector(moduleConfig.ignore, selector))
  );
}
