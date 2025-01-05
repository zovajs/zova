import fse from 'fs-extra';
import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { IControllerInfo } from './types.js';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';

export function generateMetaPage(
  options: IMetadataCustomGenerateOptions,
  globFiles: [IGlobBeanFile, IControllerInfo][],
) {
  const { moduleName } = options;
  const contentExports: string[] = [];
  const contentPathRecords: string[] = [];
  const contentNameRecords: string[] = [];
  const contentPathSchemas: string[] = [];
  const contentNameSchemas: string[] = [];
  for (const [globFile, controllerInfo] of globFiles) {
    const { className } = globFile;
    const { name, nameCapitalize, nameSchemaParams, hasSchemaParams, nameSchemaQuery, hasSchemaQuery } = controllerInfo;
    // controller.tsx
    const { routePath, routeName } = await _extractRoutePathOrName(options, globFile, controllerInfo);
    // no matter that: route.meta?.absolute
    const routePathFull = routePath
      ? `/${moduleInfo.pid}/${moduleInfo.name}/${routePath}`
      : `/${moduleInfo.pid}/${moduleInfo.name}`;
    const routeNameFull = `${moduleName}:${routeName}`;
    //
    contentExports.push(`export * from '../page/${pageName}/controller.js';`);
    if (!routeName) {
      if (enableRouteQuery) {
        contentPathRecords.push(`'${routePathFull}': ${className}.QueryInput;`);
      } else {
        contentPathRecords.push(`'${routePathFull}': undefined;`); // for type of route path
      }
    } else {
      if (enableRouteQuery || enableRouteParams) {
        contentNameRecords.push(
          `'${routeNameFull}': TypePageParamsQuery<${enableRouteQuery ? `${className}.QueryInput` : 'unknown'}, ${enableRouteParams ? `${className}.ParamsInput` : 'unknown'}>;`,
        );
      }
    }
    if (!routeName) {
      if (enableRouteQuery) {
        contentPathSchemas.push(`'${routePathFull}': {
          query: ${className}.querySchema,
        },`);
      }
    } else {
      if (enableRouteQuery || enableRouteParams) {
        contentNameSchemas.push(`'${routeNameFull}': {
          ${enableRouteParams ? `params: ${className}.paramsSchema,` : ''}
          ${enableRouteQuery ? `query: ${className}.querySchema,` : ''}
        },`);
      }
    }
  }
  // combine
  const content = `/** pages: begin */
${contentExports.join('\n')}
export * from '../routes.js';
${contentNameRecords.length > 0 ? "import { TypePageParamsQuery } from 'zova';" : ''}
import 'zova';
declare module 'zova' {
export interface IPagePathRecord {
  ${contentPathRecords.join('\n')}
}
export interface IPageNameRecord {
  ${contentNameRecords.join('\n')}
}
}
export const pagePathSchemas = {
${contentPathSchemas.join('\n')}
};
export const pageNameSchemas = {
${contentNameSchemas.join('\n')}
};
/** pages: end */
`;
  return content;
}

function _extractRoutePathOrName(
  options: IMetadataCustomGenerateOptions,
  _globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const cli = options.cli as BeanCliBase;
  const targetFile = path.join(options.modulePath, 'src/routes.ts');
  const content = fse.readFileSync(targetFile).toString('utf8');
  const ast = cli.helper.gogocode(content);
  const astNode = ast.find('export const routes: IModuleRoute[] = [$_$]');
  const astMatches = astNode.match[0];
  const astMatch = astMatches.find(item => {
    return (<any>item.node).properties.some(prop => {
      return prop.key.name === 'component' && prop.value.name === className;
    });
  });
  if (!astMatch) {
    throw new Error(`page route not found: ${className}`);
  }
  const astPropPath = (<any>astMatch?.node).properties.find(prop => {
    return prop.key.name === 'path';
  });
  const routePath = astPropPath?.value.value || '';
  const astPropName = (<any>astMatch?.node).properties.find(prop => {
    return prop.key.name === 'name';
  });
  const routeName = astPropName?.value.value;
  return { routePath, routeName };
}
