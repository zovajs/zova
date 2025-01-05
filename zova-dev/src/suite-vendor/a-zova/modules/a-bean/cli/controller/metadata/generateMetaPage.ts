import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { IControllerInfo } from './types.js';

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
    const { name, nameCapitalize } = controllerInfo;
    // controller.ts
    const enableRouteQuery = controllerContent.includes('const QuerySchema');
    const enableRouteParams = controllerContent.includes('const ParamsSchema');
    //
    const { routePath, routeName } = await _extractRoutePathOrName(modulePath, pageNameCapitalize);
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
