import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import type { IControllerInfo } from './types.js';
import path from 'node:path';
import fse from 'fs-extra';
import { generateFileComponent } from './generateFileComponent.js';
import { generateFilePage } from './generateFilePage.js';

export async function generateFile(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
  controllerInfo: IControllerInfo,
) {
  const cli = options.cli;
  const fileDest = path.join(options.modulePath, `src/.metadata/${controllerInfo.type}/${controllerInfo.name}.ts`);
  const content =
    controllerInfo.type === 'page'
      ? generateFilePage(options, globFile, controllerInfo)
      : generateFileComponent(options, globFile, controllerInfo);
  await fse.outputFile(fileDest, content);
  await cli.helper.formatFile({ fileName: fileDest });
}
