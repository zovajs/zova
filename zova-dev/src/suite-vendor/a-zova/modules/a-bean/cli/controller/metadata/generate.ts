import fse from 'fs-extra';
import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import path from 'node:path';
import { IControllerInfo } from './types.js';
import { generateMetaComponent } from './generateMetaComponent.js';
import { generateMetaPage } from './generateMetaPage.js';
import { generateFileVue } from './generateFileVue.js';

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
  const { fileContent, fileNameJSRelative } = globFile;
  const matches = fileNameJSRelative.match(/..\/(.+?)\/(.+?)\/controller/);
  if (!matches) return;
  const type = matches[1];
  if (!['page', 'component'].includes(type)) return;
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
  // schemaParams
  const nameSchemaParams = `ControllerPage${nameCapitalize}SchemaParams`;
  const hasSchemaParams = fileContent.includes(nameSchemaParams);
  // schemaQuery
  const nameSchemaQuery = `ControllerPage${nameCapitalize}SchemaQuery`;
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
    nameProps,
    hasProps,
    nameEmits,
    hasEmits,
    nameSlots,
    hasSlots,
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
