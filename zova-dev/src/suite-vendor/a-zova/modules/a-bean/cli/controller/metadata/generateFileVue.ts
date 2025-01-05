import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { IControllerInfo } from './types.js';
import { BeanCliBase } from '@cabloy/cli';
import path from 'node:path';
import fse from 'fs-extra';

export async function generateFileVue(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const cli = options.cli as BeanCliBase;
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
  const { name, nameCapitalize, importRender, importStyle } = controllerInfo;
  const contentImports: string[] = [];
  // controller
  contentImports.push("import { useControllerPage } from 'zova';");
  contentImports.push(`import { ControllerPage${nameCapitalize} } from '../../page/${name}/controller.jsx';`);
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
  _globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const {
    name,
    nameCapitalize,
    nameProps,
    hasProps,
    nameEmits,
    hasEmits,
    nameSlots,
    hasSlots,
    importRender,
    importStyle,
  } = controllerInfo;
  const contentImports: string[] = [];
  // controller
  contentImports.push(`import { useController${hasProps ? '' : ', PropsBase'} } from 'zova';`);
  contentImports.push(
    `import { Controller${nameCapitalize}${hasProps ? `, ${nameProps}` : ''}${hasEmits ? `, ${nameEmits}` : ''}${!hasProps && hasSlots ? `, ${nameSlots}` : ''} } from '../../component/${name}/controller.jsx';`,
  );
  // render
  if (importRender) {
    contentImports.push(importRender);
  }
  // style
  if (importStyle) {
    contentImports.push(importStyle);
  }
  // props
  let contentProps = '';
  if (hasProps) {
    contentProps = `const props = withDefaults(defineProps<${nameProps}>(), Controller${nameCapitalize}.$propsDefault);`;
  } else {
    contentProps = `const props = defineProps<PropsBase<Controller${nameCapitalize}${hasSlots ? `, ${nameSlots}` : ''}>>();`;
  }
  // emits
  let contentEmits = '';
  if (hasEmits) {
    contentEmits = `const emit = defineEmits<${nameEmits}>();`;
  }
  // content
  const content = `<template>
  <template></template>
</template>

<script setup lang="ts">
${contentImports.join('\n')}
${contentProps}
${contentEmits}
useController(props, ${hasEmits ? 'emit' : 'undefined'}, Controller${nameCapitalize}, ${importRender ? `Render${nameCapitalize}` : undefined}, ${importStyle ? `Style${nameCapitalize}` : undefined});
</script>
`;
  return content;
}
