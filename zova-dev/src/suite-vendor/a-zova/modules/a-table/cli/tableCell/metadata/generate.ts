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
    await generateRestTableCell(options, globFile);
  }
  return '';
}

async function generateRestTableCell(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
) {
  const { moduleName, modulePath } = options;
  const { beanName, beanNameCapitalize, sceneName } = globFile;
  // options
  const typeOptionsName = `ITableCellOptions${beanNameCapitalize}`;
  // import
  const contentImports: string[] = [];
  contentImports.push(`import type { ${typeOptionsName} } from 'zova-module-${moduleName}';`);
  // component
  const componentNamePrefix = 'BBT';
  const componentName = beanName;
  const componentNameFull = `${componentNamePrefix}${toUpperCaseFirstChar(combineResourceName(componentName, moduleName, true, true))}`;
  const contentComponent = `export function ${componentNameFull}(
  _props: ${typeOptionsName},
) {
  return '${moduleName}.${sceneName}.${beanName}';
}`;
  // content
  const content = `${contentImports.join('\n')}

${contentComponent}
`;
  // output
  const fileDest = path.join(modulePath, `rest/tableCell/${beanName}.ts`);
  await fse.outputFile(fileDest, content);
  // tableCells
  const fileComponents = path.join(modulePath, 'rest/tableCells.ts');
  let contentComponents = '';
  if (fse.existsSync(fileComponents)) {
    contentComponents = (await fse.readFile(fileComponents)).toString();
  }
  const exportContent = `export * from './tableCell/${beanName}.js';`;
  if (!contentComponents.includes(exportContent)) {
    contentComponents = `${contentComponents}${exportContent}\n`;
    await fse.outputFile(fileComponents, contentComponents);
  }
  // index
  const exportIndexContent = "export * from './tableCells.js';";
  await generateRestIndex(modulePath, exportIndexContent);
}
