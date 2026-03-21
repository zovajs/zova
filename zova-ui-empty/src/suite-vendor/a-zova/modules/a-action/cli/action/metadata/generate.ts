import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';

import { combineResourceName } from '@cabloy/utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import path from 'node:path';

import { generateRestIndex } from './utils.ts';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { globFiles } = options;
  for (const globFile of globFiles) {
    if (globFile.isIgnore) continue;
    // restComponent
    await generateRestAction(options, globFile);
  }
  return '';
}

async function generateRestAction(options: IMetadataCustomGenerateOptions, globFile: IGlobBeanFile) {
  const { moduleName, modulePath } = options;
  const { beanName, beanNameCapitalize, fileNameJS } = globFile;
  // options
  const typeOptionsName = `IActionOptions${beanNameCapitalize}`;
  // import
  const contentImports: string[] = [];
  contentImports.push("import type { TypeActionOptionsRest } from 'zova-module-a-action';");
  contentImports.push(`import type { ${typeOptionsName} } from '../../src/bean/${fileNameJS}';`);
  // component
  const componentNamePrefix = 'AA';
  const componentName = beanName;
  const componentNameFull = `${componentNamePrefix}${toUpperCaseFirstChar(combineResourceName(componentName, moduleName, true, true))}`;
  const contentComponent = `export function ${componentNameFull}(
  _props: TypeActionOptionsRest<${typeOptionsName}>,
) {
  return '${moduleName}:${beanName}';
}`;
  // content
  const content = `${contentImports.join('\n')}

${contentComponent}
`;
  // output
  const fileDest = path.join(modulePath, `rest/action/${beanName}.ts`);
  await fse.outputFile(fileDest, content);
  // actions
  const fileComponents = path.join(modulePath, 'rest/actions.ts');
  let contentComponents = '';
  if (fse.existsSync(fileComponents)) {
    contentComponents = (await fse.readFile(fileComponents)).toString();
  }
  const exportContent = `export * from './action/${beanName}.js';`;
  if (!contentComponents.includes(exportContent)) {
    contentComponents = `${contentComponents}${exportContent}\n`;
    await fse.outputFile(fileComponents, contentComponents);
  }
  // index
  const exportIndexContent = "export * from './actions.js';";
  await generateRestIndex(modulePath, exportIndexContent);
}
