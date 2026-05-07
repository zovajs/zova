import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';

import fse from 'fs-extra';
import path from 'node:path';

import { generateRestIndex } from './utils.ts';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { globFiles } = options;
  for (const globFile of globFiles) {
    if (globFile.isIgnore) continue;
    // restComponent
    await generateRestAction(options);
  }
  return '';
}

async function generateRestAction(options: IMetadataCustomGenerateOptions) {
  const { moduleName, modulePath } = options;
  // actions
  const fileActions = path.join(modulePath, 'rest/actions.ts');
  if (fse.existsSync(fileActions)) return;
  const contentActions = `export * from 'zova-module-${moduleName}';`;
  await fse.outputFile(fileActions, contentActions);
  // index
  const exportIndexContent = "export * from './actions.js';";
  await generateRestIndex(modulePath, exportIndexContent);
}
