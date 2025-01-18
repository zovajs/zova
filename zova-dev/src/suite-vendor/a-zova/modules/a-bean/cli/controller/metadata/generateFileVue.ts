import { IGlobBeanFile } from '@cabloy/module-info';
import { IControllerInfo } from './types.js';
import { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import path from 'node:path';
import fse from 'fs-extra';

export async function generateFileVue(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const cli = options.cli;
  const fileDest = path.join(options.modulePath, `src/.metadata/${controllerInfo.type}/${controllerInfo.name}.vue`);
  const content =
    controllerInfo.type === 'page'
      ? _generateFileVuePage(options, globFile, controllerInfo)
      : _generateFileVueComponent(options, globFile, controllerInfo);
  await fse.outputFile(fileDest, content);
  await cli.helper.formatFile({ fileName: fileDest });
}

function _generateFileVuePage(
  _options: IMetadataCustomGenerateOptions,
  _globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const { name, nameCapitalize, controllerExtJs, importRender, importStyle } = controllerInfo;
  const contentImports: string[] = [];
  // controller
  contentImports.push("import { useControllerPage } from 'zova';");
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
  // content
  const content = `<template>
  <template></template>
</template>

<script setup lang="ts">
${contentImports.join('\n')}
useControllerPage(ControllerPage${nameCapitalize}, ${importRender ? `RenderPage${nameCapitalize}` : undefined}, ${importStyle ? `StylePage${nameCapitalize}` : undefined});
</script>
`;
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
