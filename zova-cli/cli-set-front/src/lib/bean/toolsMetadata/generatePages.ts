import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { IModuleInfo } from '@cabloy/module-info';
import fse from 'fs-extra';
import gogocode from 'gogocode';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generatePages(moduleInfo: IModuleInfo, moduleName: string, modulePath: string) {
  const pattern = `${modulePath}/src/page/*/index.vue`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentPathRecords: string[] = [];
  const contentNameRecords: string[] = [];
  const contentPathSchemas: string[] = [];
  const contentNameSchemas: string[] = [];
  for (const file of files) {
    const pageName = path.basename(file.substring(0, file.length - '/index.vue'.length));
    const pageNameCapitalize = toUpperCaseFirstChar(pageName);
    const className = 'ControllerPage' + pageNameCapitalize;
    // controller.ts
    const controllerContent = (await fse.readFile(file.replace('index.vue', 'controller.ts'))).toString();
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
    if (enableRouteQuery || enableRouteParams) {
      contentImports.push(`import { ${className} } from '../page/${pageName}/controller.js';`);
    }
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
${contentImports.join('\n')}
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

async function _extractRoutePathOrName(modulePath: string, className: string) {
  const targetFile = path.join(modulePath, 'src/routes.ts');
  const content = (await fse.readFile(targetFile)).toString('utf8');
  const ast = gogocode(content);
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
