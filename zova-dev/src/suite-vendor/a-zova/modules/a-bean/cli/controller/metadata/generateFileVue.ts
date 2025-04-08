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
  // todo: 重新放到一起
  let fileDest;
  if (controllerInfo.type === 'page') {
    fileDest = path.join(options.modulePath, `src/.metadata/${controllerInfo.type}/${controllerInfo.name}.ts`);
  } else {
    fileDest = path.join(options.modulePath, `src/.metadata/${controllerInfo.type}/${controllerInfo.name}.vue`);
  }
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
  _options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const { className } = globFile;
  const {
    name,
    nameCapitalize,
    controllerExtJs,
    hasComponentOptions,
    nameProps,
    hasProps,
    nameEmits,
    hasEmits,
    nameSlots,
    hasSlots,
    hasGeneric,
    importRender,
    importStyle,
  } = controllerInfo;
  const contentImports: string[] = [];
  const namePropsGeneric = hasGeneric ? `${nameProps}<T>` : nameProps;
  const nameEmitsGeneric = hasGeneric ? `${nameEmits}<T>` : nameEmits;
  // const nameSlotsGeneric = hasGeneric ? `${nameSlots}<T>` : nameSlots;
  // controller
  contentImports.push("import { useController } from 'zova';");
  contentImports.push(
    `import { ${className}${hasProps ? `, ${nameProps}` : ''}${hasEmits ? `, ${nameEmits}` : ''}${!hasProps && hasSlots ? `, ${nameSlots}` : ''} } from '../../component/${name}/controller${controllerExtJs}';`,
  );
  // render
  if (importRender) {
    contentImports.push(importRender);
  }
  // style
  if (importStyle) {
    contentImports.push(importStyle);
  }
  // componentOptions
  if (hasComponentOptions) {
    contentImports.push(`defineOptions(Controller${nameCapitalize}.$componentOptions);`);
  }
  // props
  let contentProps = '';
  if (hasProps) {
    contentProps = `const props = withDefaults(defineProps<${namePropsGeneric}>(), Controller${nameCapitalize}.$propsDefault);`;
  }
  // emits
  let contentEmits = '';
  if (hasEmits) {
    contentEmits = `const emit = defineEmits<${nameEmitsGeneric}>();`;
  }
  // content
  const content = `<template>
  <template></template>
</template>

<script setup lang="ts"${hasGeneric ? ' generic="T"' : ''}>
${contentImports.join('\n')}
${contentProps}
${contentEmits}
useController(${hasProps ? 'props' : 'undefined'}, ${hasEmits ? 'emit' : 'undefined'}, Controller${nameCapitalize}, ${importRender ? `Render${nameCapitalize}` : undefined}, ${importStyle ? `Style${nameCapitalize}` : undefined});
</script>
`;
  return content;
}
