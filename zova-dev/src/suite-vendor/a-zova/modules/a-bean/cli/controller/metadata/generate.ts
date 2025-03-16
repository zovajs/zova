import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type { IControllerInfo } from './types.ts';
import path from 'node:path';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import { generateFileVue } from './generateFileVue.ts';
import { generateMetaComponent } from './generateMetaComponent.ts';
import { generateMetaPage } from './generateMetaPage.ts';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { globFiles } = options;
  const globFilesPage: [IGlobBeanFile, IControllerInfo][] = [];
  const globFilesComponent: [IGlobBeanFile, IControllerInfo][] = [];
  for (const globFile of globFiles) {
    if (globFile.isIgnore) continue;
    const controllerInfo = _parseControllerInfo(options, globFile);
    if (!controllerInfo) continue;
    await generateFileVue(options, globFile, controllerInfo);
    if (controllerInfo.type === 'page') {
      globFilesPage.push([globFile, controllerInfo]);
    } else {
      globFilesComponent.push([globFile, controllerInfo]);
    }
  }
  const contentMetaPage = generateMetaPage(options, globFilesPage);
  const contentMetaComponent = generateMetaComponent(options, globFilesComponent);
  const content = `${contentMetaPage}\n${contentMetaComponent}`;
  return content;
}

function _parseControllerInfo(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
): IControllerInfo | undefined {
  const { className, fileContent, fileNameJSRelative } = globFile;
  const matches = fileNameJSRelative.match(/..\/(.+?)\/(.+?)\/controller(.jsx?)$/);
  if (!matches) return;
  const type = matches[1];
  if (!['page', 'component'].includes(type)) return;
  const name = matches[2];
  const nameCapitalize = toUpperCaseFirstChar(name);
  const controllerExtJs = matches[3];
  const controllerExtTs = controllerExtJs.replace('.js', '.ts');
  // componentOptions
  const componentOptionsMatched = fileContent.match(/static \$componentOptions[^=]* = (\{[\s\S]*?\});/);
  const componentOptions = componentOptionsMatched ? componentOptionsMatched[1] : '';
  const hasComponentOptions = !!componentOptionsMatched;
  // props
  const nameProps = `${className}Props`;
  const hasProps = fileContent.includes(nameProps);
  // emits
  const nameEmits = `${className}Emits`;
  const hasEmits = fileContent.includes(nameEmits);
  // slots
  const nameSlots = `${className}Slots`;
  const hasSlots = fileContent.includes(nameSlots);
  // model
  const hasModel = fileContent.includes("(e: 'update:");
  const hasModelValue = fileContent.includes("(e: 'update:modelValue'");
  // generic
  const matchGeneric = fileContent.match(/interface [^<]*Props<(.*?)> \{/);
  const hasGeneric = !!matchGeneric;
  // schemaParams
  const nameSchemaParams = `${className}SchemaParams`;
  const hasSchemaParams = fileContent.includes(nameSchemaParams);
  // schemaQuery
  const nameSchemaQuery = `${className}SchemaQuery`;
  const hasSchemaQuery = fileContent.includes(nameSchemaQuery);
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
    importStyle = `import { Style${type === 'page' ? 'Page' : ''}${nameCapitalize} } from '../../${type}/${name}/style.js';`;
  }
  // ok
  return {
    type,
    name,
    nameCapitalize,
    controllerExtJs,
    controllerExtTs,
    componentOptions,
    hasComponentOptions,
    nameProps,
    hasProps,
    nameEmits,
    hasEmits,
    nameSlots,
    hasSlots,
    hasModel,
    hasModelValue,
    hasGeneric,
    nameSchemaParams,
    hasSchemaParams,
    nameSchemaQuery,
    hasSchemaQuery,
    fileRender,
    importRender,
    fileStyle,
    importStyle,
  };
}
