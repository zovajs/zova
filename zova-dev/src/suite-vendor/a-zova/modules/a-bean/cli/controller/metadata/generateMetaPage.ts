import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type { IControllerInfo } from './types.js';
import path from 'node:path';
import fse from 'fs-extra';

export function generateMetaPage(
  options: IMetadataCustomGenerateOptions,
  globFiles: [IGlobBeanFile, IControllerInfo][],
) {
  if (globFiles.length === 0) return '';
  const { moduleName } = options;
  const contentImports: string[] = [];
  const contentPathRecords: string[] = [];
  const contentNameRecords: string[] = [];
  const contentPathSchemas: string[] = [];
  const contentNameSchemas: string[] = [];
  const contentRecords: string[] = [];
  for (const [globFile, controllerInfo] of globFiles) {
    const { className } = globFile;
    const { name, hasSchemaParams, hasSchemaQuery } = controllerInfo;
    contentImports.push(`export * from './page/${name}.js';`);
    if (hasSchemaParams || hasSchemaQuery) {
      contentImports.push(`import { NS${className} } from './page/${name}.js';`);
    }
    // controller.tsx
    const { routePath, routeName } = _extractRoutePathOrName(options, globFile, controllerInfo);
    // no matter that: route.meta?.absolute
    const routePathFull = routePath
      ? `/${moduleName.replace('-', '/')}/${routePath}`
      : `/${moduleName.replace('-', '/')}`;
    const routeNameFull = `${moduleName}:${routeName}`;
    //
    if (!routeName) {
      if (hasSchemaQuery) {
        contentPathRecords.push(`'${routePathFull}': NS${className}.QueryInput;`);
      } else {
        contentPathRecords.push(`'${routePathFull}': undefined;`); // for type of route path
      }
    } else {
      if (hasSchemaQuery || hasSchemaParams) {
        contentNameRecords.push(
          `'${routeNameFull}': TypePageParamsQuery<${hasSchemaQuery ? `NS${className}.QueryInput` : 'unknown'}, ${hasSchemaParams ? `NS${className}.ParamsInput` : 'unknown'}>;`,
        );
      }
    }
    if (!routeName) {
      if (hasSchemaQuery) {
        contentPathSchemas.push(`'${routePathFull}': {
          query: NS${className}.querySchema,
        },`);
      }
    } else {
      if (hasSchemaQuery || hasSchemaParams) {
        contentNameSchemas.push(`'${routeNameFull}': {
          ${hasSchemaParams ? `params: NS${className}.paramsSchema,` : ''}
          ${hasSchemaQuery ? `query: NS${className}.querySchema,` : ''}
        },`);
      }
    }
    //
    const _contentRecords_parts: string[] = [];
    if (hasSchemaParams) _contentRecords_parts.push(`$params: NS${className}.ParamsOutput;`);
    if (hasSchemaQuery) _contentRecords_parts.push(`$query: NS${className}.QueryOutput;`);
    if (_contentRecords_parts.length > 0) {
      contentRecords.push(`export interface ${className} {
        ${_contentRecords_parts.join('\n')}
      }`);
    }
  }
  // combine
  const content = `/** pages: begin */
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
declare module 'zova-module-${moduleName}' {
  ${contentRecords.join('\n')} 
}
/** pages: end */
`;
  return content;
}

function _extractRoutePathOrName(
  options: IMetadataCustomGenerateOptions,
  _globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const cli = options.cli;
  const targetFile = path.join(options.modulePath, 'src/routes.ts');
  const content = fse.readFileSync(targetFile).toString('utf8');
  const ast = cli.helper.gogocode(content);
  if (!ast || !ast.find) {
    // eslint-disable-next-line
    console.log(targetFile);
  }
  const astNode = ast.find('export const routes: IModuleRoute[] = [$_$]');
  const astMatches = astNode.match[0];
  const astMatch = astMatches.find(item => {
    return (item.node as any).properties.some(prop => {
      return prop.key.name === 'component' && (prop.value.name === controllerInfo.nameCapitalize || prop.value.name === `ZPage${controllerInfo.nameCapitalize}`);
    });
  });
  if (!astMatch) {
    throw new Error(`page route not found: ${controllerInfo.nameCapitalize}`);
  }
  const astPropPath = (astMatch?.node as any).properties.find(prop => {
    return prop.key.name === 'path';
  });
  const routePath = astPropPath?.value.value || '';
  const astPropName = (astMatch?.node as any).properties.find(prop => {
    return prop.key.name === 'name';
  });
  const routeName = astPropName?.value.value;
  return { routePath, routeName };
}
