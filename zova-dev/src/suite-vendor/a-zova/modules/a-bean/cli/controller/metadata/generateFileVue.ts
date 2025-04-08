import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type { IControllerInfo } from './types.js';
import path from 'node:path';
import fse from 'fs-extra';

export async function generateFileVue(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const cli = options.cli;
  const fileDest = path.join(options.modulePath, `src/.metadata/${controllerInfo.type}/${controllerInfo.name}.ts`);
  const content =
    controllerInfo.type === 'page'
      ? _generateFileVuePage(options, globFile, controllerInfo)
      : _generateFileVueComponent(options, globFile, controllerInfo);
  await fse.outputFile(fileDest, content);
  await cli.helper.formatFile({ fileName: fileDest });
}

function _generateFileVuePage(
  _options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const { className } = globFile;
  const { name, nameCapitalize, controllerExtJs, importRender, importStyle } = controllerInfo;
  const { nameSchemaParams, hasSchemaParams, nameSchemaQuery, hasSchemaQuery } = controllerInfo;
  const contentImports: string[] = [];
  // controller
  contentImports.push("import { createZovaComponentPage } from 'zova';");
  contentImports.push(
    `import { ControllerPage${nameCapitalize} } from '../../page/${name}/controller${controllerExtJs}';`,
  );
  // render
  if (importRender) {
    contentImports.push(importRender);
  }
  // style
  if (importStyle) {
    contentImports.push(importStyle);
  }
  // params/query
  const _contentImports_parts: string[] = [];
  if (hasSchemaParams) _contentImports_parts.push(nameSchemaParams);
  if (hasSchemaQuery) _contentImports_parts.push(nameSchemaQuery);
  if (_contentImports_parts.length > 0) {
    contentImports.push(
      `import { ${_contentImports_parts.join(', ')} } from '../../page/${name}/controller${controllerExtJs}';`,
    );
  }
  //
  const _contentRecords2_parts: string[] = [];
  if (hasSchemaParams) {
    _contentRecords2_parts.push(`export const paramsSchema = ${nameSchemaParams};
      export type ParamsInput = z.input<typeof ${nameSchemaParams}>;
      export type ParamsOutput = z.output<typeof ${nameSchemaParams}>;
    `);
  }
  if (hasSchemaQuery) {
    _contentRecords2_parts.push(`export const querySchema = ${nameSchemaQuery};
      export type QueryInput = z.input<typeof ${nameSchemaQuery}>;
      export type QueryOutput = z.output<typeof ${nameSchemaQuery}>;
    `);
  }
  if (_contentRecords2_parts.length > 0) {
    contentImports.push('import { z } from \'zod\';');
    contentImports.push(`export namespace NS${className} {
      ${_contentRecords2_parts.join('\n')}
    }`);
  }
  // export page
  contentImports.push(`export const ZPage${nameCapitalize} = createZovaComponentPage(ControllerPage${nameCapitalize}, ${importRender ? `RenderPage${nameCapitalize}` : undefined}, ${importStyle ? `StylePage${nameCapitalize}` : undefined});`);
  // content
  const content = `${contentImports.join('\n')}\n`;
  return content;
}

function _generateFileVueComponent(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const { moduleName } = options;
  const { className } = globFile;
  const {
    name,
    nameCapitalize,
    controllerExtJs,
    hasComponentOptions,
    nameProps,
    hasProps,
    hasGeneric,
    hasModel,
    hasModelValue,
    generic,
    genericKeys,
    importRender,
    importStyle,
  } = controllerInfo;
  const contentImports: string[] = [];
  const functionGeneric = hasGeneric ? `<${generic}>` : '';
  const namePropsGeneric = hasGeneric ? `${nameProps}<${genericKeys?.join(',')}>` : nameProps;
  const componentOptions = hasComponentOptions ? `Controller${nameCapitalize}.$componentOptions,` : '';
  // controller
  contentImports.push("import { defineComponent } from 'vue'");
  contentImports.push("import { useController } from 'zova';");
  contentImports.push(
    `import { ${className} } from '../../component/${name}/controller${controllerExtJs}';`,
  );
  if (hasProps) {
    contentImports.push(
      `import type { ${nameProps} } from '../../component/${name}/controller${controllerExtJs}';`,
    );
  }
  // render
  if (importRender) {
    contentImports.push(importRender);
  }
  // style
  if (importStyle) {
    contentImports.push(importStyle);
  }
  // combine
  const contentRecords2: string[] = [];
  if (hasProps) {
    const namePropsGeneric = hasGeneric ? `${nameProps}<${generic}>` : nameProps;
    contentRecords2.push(`// eslint-disable-next-line
  export interface ${namePropsGeneric} {
        controllerRef?: (ref: ${className}) => void;
      }
      `);
  }
  const _contentRecords_parts: string[] = [];
  if (hasProps) {
    contentImports.push('import type { RequiredSome } from \'zova\';');
    _contentRecords_parts.push(`$props: RequiredSome<${nameProps}, keyof typeof ${className}.$propsDefault>;`);
  }
  if (hasModel) {
    _contentRecords_parts.push(
      `$useModel<K extends keyof ${nameProps}>(name: K, options?: DefineModelOptions<${nameProps}[K]>): RequiredSome<${nameProps}, keyof typeof ${className}.$propsDefault>[K];`,
    );
    if (hasModelValue) {
      _contentRecords_parts.push(
        `$useModel(options?: DefineModelOptions<${nameProps}['modelValue']>): RequiredSome<${nameProps}, keyof typeof ${className}.$propsDefault>['modelValue'];`,
      );
    }
  }
  if (_contentRecords_parts.length > 0) {
    contentRecords2.push(`export interface ${className} {
      ${_contentRecords_parts.join('\n')}
    }`);
  }
  const contentCombine = contentRecords2.length > 0
    ? `
declare module 'zova-module-${moduleName}' {
  ${contentRecords2.join('\n')} 
}
`
    : '';
  // content
  const content = `${contentImports.join('\n')}
${contentCombine}
export const Z${nameCapitalize} = defineComponent(
  ${functionGeneric}(_props: ${namePropsGeneric}) => {
    useController(Controller${nameCapitalize}, ${importRender ? `Render${nameCapitalize}` : undefined}, ${importStyle ? `Style${nameCapitalize}` : undefined});
    return () => {
      return null;
    };
  },${componentOptions}
);
`;
  return content;
}
