import fse from 'fs-extra';
import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';

interface IControllerInfo {
  type: string;
  name: string;
  nameCapitalize: string;
}

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { globFiles } = options;
  for (const globFile of globFiles) {
    const { fileNameJSRelative } = globFile;
    const controllerInfo = _parseControllerInfo(fileNameJSRelative);
    if (!controllerInfo) continue;
    await _generateFileVue(options, globFile, controllerInfo);
    console.log(controllerInfo);
  }
  const content = '';
  return content;
}

async function _generateFileVue(
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
  options: IMetadataCustomGenerateOptions,
  _globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const { type, name, nameCapitalize } = controllerInfo;
  const contentImports: string[] = [];
  // controller
  contentImports.push("import { useControllerPage } from 'zova';");
  contentImports.push(`import { ControllerPage${nameCapitalize} } from '../../page/${name}/controller.jsx';`);
  const fileRender = path.join(options.modulePath, `src/${type}/${name}/render.tsx`);
  // render
  const hasRender = fse.existsSync(fileRender);
  if (hasRender) {
    contentImports.push(`import { RenderPage${nameCapitalize} } from '../../page/${name}/render.jsx';`);
  }
  // style
  const fileStyle = path.join(options.modulePath, `src/${type}/${name}/style.ts`);
  const hasStyle = fse.existsSync(fileStyle);
  if (hasStyle) {
    contentImports.push(`import { StylePage${nameCapitalize} } from '../../page/${name}/style.js';`);
  }
  // content
  const content = `<template>
  <template></template>
</template>

<script setup lang="ts">
${contentImports.join('\n')}
useControllerPage(ControllerPage${nameCapitalize}, ${hasRender ? `RenderPage${nameCapitalize}` : undefined}, ${hasStyle ? `StylePage${nameCapitalize}` : undefined});
</script>
`;
  return content;
}

function _generateFileVueComponent(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const { type, name, nameCapitalize } = controllerInfo;
  const contentImports: string[] = [];
  // props
  const nameProps = `Controller${nameCapitalize}Props`;
  const hasProps = globFile.fileContent.includes(nameProps);
  // emits
  const nameEmits = `Controller${nameCapitalize}Emits`;
  const hasEmits = globFile.fileContent.includes(nameEmits);
  // slots
  const nameSlots = `Controller${nameCapitalize}Slots`;
  const hasSlots = globFile.fileContent.includes(nameSlots);
  // controller
  contentImports.push(`import { useController${hasProps ? '' : ', PropsBase'} } from 'zova';`);
  contentImports.push(
    `import { Controller${nameCapitalize}${hasProps ? `, ${nameProps}` : ''}${hasEmits ? `, ${nameEmits}` : ''}${!hasProps && hasSlots ? `, ${nameSlots}` : ''} } from '../../component/${name}/controller.jsx';`,
  );
  // render
  const fileRender = path.join(options.modulePath, `src/${type}/${name}/render.tsx`);
  const hasRender = fse.existsSync(fileRender);
  if (hasRender) {
    contentImports.push(`import { Render${nameCapitalize} } from '../../component/${name}/render.jsx';`);
  }
  // style
  const fileStyle = path.join(options.modulePath, `src/${type}/${name}/style.ts`);
  const hasStyle = fse.existsSync(fileStyle);
  if (hasStyle) {
    contentImports.push(`import { Style${nameCapitalize} } from '../../component/${name}/style.js';`);
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
useController(props, ${hasEmits ? 'emit' : 'undefined'}, Controller${nameCapitalize}, ${hasRender ? `Render${nameCapitalize}` : undefined}, ${hasStyle ? `Style${nameCapitalize}` : undefined});
</script>
`;
  return content;
}

function _parseControllerInfo(fileNameJSRelative: string): IControllerInfo | undefined {
  const matches = fileNameJSRelative.match(/..\/(.+?)\/(.+?)\/controller/);
  if (!matches) return;
  return {
    type: matches[1],
    name: matches[2],
    nameCapitalize: toUpperCaseFirstChar(matches[2]),
  };
}
