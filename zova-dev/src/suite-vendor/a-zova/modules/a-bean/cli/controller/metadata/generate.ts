import fse from 'fs-extra';
import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';

interface IControllerInfo {
  type: string;
  name: string;
  nameCapitalize: string;
  nameProps: string;
  hasProps: boolean;
  nameEmits: string;
  hasEmits: boolean;
  nameSlots: string;
  hasSlots: boolean;
  fileRender: string;
  importRender: string;
  fileStyle: string;
  importStyle: string;
}

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { globFiles } = options;
  const globFilesPage: [IGlobBeanFile, IControllerInfo][] = [];
  const globFilesComponent: [IGlobBeanFile, IControllerInfo][] = [];
  for (const globFile of globFiles) {
    const controllerInfo = _parseControllerInfo(globFile);
    if (!controllerInfo) continue;
    await _generateFileVue(options, globFile, controllerInfo);
    if (controllerInfo.type === 'page') {
      globFilesPage.push([globFile, controllerInfo]);
    } else {
      globFilesComponent.push([globFile, controllerInfo]);
    }
  }
  const contentMetaPage = _generateMetaPage(options, globFilesPage);
  const contentMetaComponent = _generateMetaComponent(options, globFilesComponent);
  const content = `${contentMetaPage}\n${contentMetaComponent}`;
  return content;
}

function _generateMetaPage(options: IMetadataCustomGenerateOptions, globFiles: [IGlobBeanFile, IControllerInfo][]) {}

function _generateMetaComponent(
  options: IMetadataCustomGenerateOptions,
  globFiles: [IGlobBeanFile, IControllerInfo][],
) {
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentImports2: string[] = [];
  const contentComponents: string[] = [];
  const contentRecords: string[] = [];
  const contentRecords2: string[] = [];
  for (const [globFile, controllerInfo] of globFiles) {
  }
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

function _parseControllerInfo(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
): IControllerInfo | undefined {
  const { fileContent, fileNameJSRelative } = globFile;
  const matches = fileNameJSRelative.match(/..\/(.+?)\/(.+?)\/controller/);
  if (!matches) return;
  const type = matches[1];
  const name = matches[2];
  const nameCapitalize = toUpperCaseFirstChar(name);
  // props
  const nameProps = `Controller${nameCapitalize}Props`;
  const hasProps = fileContent.includes(nameProps);
  // emits
  const nameEmits = `Controller${nameCapitalize}Emits`;
  const hasEmits = fileContent.includes(nameEmits);
  // slots
  const nameSlots = `Controller${nameCapitalize}Slots`;
  const hasSlots = fileContent.includes(nameSlots);
  // render
  const fileRender = path.join(options.modulePath, `src/${type}/${name}/render.tsx`);
  let importRender = '';
  if (fse.existsSync(fileRender)) {
    importRender = `import { Render${type === 'page' ? 'Page' : ''}${nameCapitalize} } from '../../${type}/${name}/render.jsx';`;
  }
  // style
  const fileStyle = path.join(options.modulePath, `src/${type}/${name}/style.ts`);
  let importStyle = '';
  if (fse.existsSync(fileStyle)) {
    importStyle = `import { StylePage${nameCapitalize} } from '../../page/${name}/style.js';`;
  }
  // ok
  return {
    type,
    name,
    nameCapitalize,
    nameProps,
    hasProps,
    nameEmits,
    hasEmits,
    nameSlots,
    hasSlots,
    fileRender,
    importRender,
    fileStyle,
    importStyle,
  };
}
