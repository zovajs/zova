import fse from 'fs-extra';
import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { IControllerInfo } from './types.js';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';

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
  const contentRecords2: string[] = [];
  for (const [globFile, controllerInfo] of globFiles) {
    const { className } = globFile;
    const { name, controllerExtJs, nameSchemaParams, hasSchemaParams, nameSchemaQuery, hasSchemaQuery } =
      controllerInfo;
    // import
    const _contentImports_parts: string[] = [];
    if (hasSchemaParams) _contentImports_parts.push(nameSchemaParams);
    if (hasSchemaQuery) _contentImports_parts.push(nameSchemaQuery);
    if (_contentImports_parts.length > 0) {
      contentImports.push(
        `import { ${_contentImports_parts.join(', ')} } from '../page/${name}/controller${controllerExtJs}';`,
      );
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
    //
    const _contentRecords2_parts: string[] = [];
    if (hasSchemaParams) {
      _contentRecords2_parts.push(`export const paramsSchema = ${nameSchemaParams};
        export type ParamsInput = zz.input<typeof ${nameSchemaParams}>;
        export type ParamsOutput = zz.output<typeof ${nameSchemaParams}>;
      `);
    }
    if (hasSchemaQuery) {
      _contentRecords2_parts.push(`export const querySchema = ${nameSchemaQuery};
        export type QueryInput = zz.input<typeof ${nameSchemaQuery}>;
        export type QueryOutput = zz.output<typeof ${nameSchemaQuery}>;
      `);
    }
    if (_contentRecords2_parts.length > 0) {
      contentRecords2.push(`export namespace NS${className} {
        ${_contentRecords2_parts.join('\n')}
      }`);
    }
  }
  // combine
  const content = `/** pages: begin */
${contentImports.join('\n')}
export * from '../routes.js';
${contentNameRecords.length > 0 ? "import { TypePageParamsQuery } from 'zova';" : ''}
${contentRecords2.length > 0 ? "import { zz } from 'zova';" : ''}
${contentRecords2.join('\n')}
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
  const cli = options.cli as BeanCliBase;
  const targetFile = path.join(options.modulePath, 'src/routes.ts');
  const content = fse.readFileSync(targetFile).toString('utf8');
  const ast = cli.helper.gogocode(content);
  if (!ast || !ast.find) {
    console.log(targetFile);
  }
  const astNode = ast.find('export const routes: IModuleRoute[] = [$_$]');
  const astMatches = astNode.match[0];
  const astMatch = astMatches.find(item => {
    return (<any>item.node).properties.some(prop => {
      return prop.key.name === 'component' && prop.value.name === controllerInfo.nameCapitalize;
    });
  });
  if (!astMatch) {
    throw new Error(`page route not found: ${controllerInfo.nameCapitalize}`);
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
