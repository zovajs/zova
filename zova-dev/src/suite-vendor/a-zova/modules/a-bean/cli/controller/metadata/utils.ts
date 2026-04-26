import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';

import fse from 'fs-extra';
import path from 'node:path';

import type { IControllerInfo } from './types.ts';

export function combineContentRenderAndStyle(
  controllerInfo: IControllerInfo,
  moduleName: string,
  className: string,
  genericDeclare: string,
  genericArguments: string,
) {
  const {
    hasRenderFirst,
    classNameRenderFirst,
    classNameRenderOthers,
    hasStyleFirst,
    classNameStyleFirst,
    classNameStyleOthers,
  } = controllerInfo;
  const contentControllerInterfaceRecords: string[] = [];
  if (hasStyleFirst) {
    contentControllerInterfaceRecords.push(
      `export interface ${classNameStyleFirst}${genericDeclare} extends ${className}${genericArguments} {}`,
    );
  }
  for (const item of classNameStyleOthers) {
    contentControllerInterfaceRecords.push(
      `export interface ${item}${genericDeclare} extends ${className}${genericArguments} {}`,
    );
  }
  if (hasRenderFirst) {
    if (hasStyleFirst) {
      contentControllerInterfaceRecords.push(
        `export interface ${classNameRenderFirst}${genericDeclare} extends ${classNameStyleFirst}${genericArguments} {}`,
      );
    } else {
      contentControllerInterfaceRecords.push(
        `export interface ${classNameRenderFirst}${genericDeclare} extends ${className}${genericArguments} {}`,
      );
    }
  }
  for (const item of classNameRenderOthers) {
    if (hasStyleFirst) {
      contentControllerInterfaceRecords.push(
        `export interface ${item}${genericDeclare} extends ${classNameStyleFirst}${genericArguments} {}`,
      );
    } else {
      contentControllerInterfaceRecords.push(
        `export interface ${item}${genericDeclare} extends ${className}${genericArguments} {}`,
      );
    }
  }
  if (contentControllerInterfaceRecords.length === 0) return '';
  return `declare module 'zova-module-${moduleName}' {
    ${contentControllerInterfaceRecords.join('\n')}
  }`;
}

export async function generateRestIndex(
  options: IMetadataCustomGenerateOptions,
  modulePath: string,
  append: string,
) {
  const { cli } = options;
  // index
  const fileIndex = path.join(modulePath, 'rest/index.ts');
  let contentIndex = '';
  if (fse.existsSync(fileIndex)) {
    contentIndex = (await fse.readFile(fileIndex)).toString();
  }
  if (!contentIndex.includes(append)) {
    contentIndex = `${contentIndex}${append}\n`;
    await fse.outputFile(fileIndex, contentIndex);
    await cli.helper.formatFile({ fileName: fileIndex });
  }
}
