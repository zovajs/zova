import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export interface IControllerInfo {
  type: string;
  name: string;
  nameCapitalize: string;
  controllerClassName: string;
}

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { moduleName, globFiles } = options;
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    if (globFile.isIgnore) continue;
    const { className } = globFile;
    const controllerInfo = _parseControllerInfo(options, globFile);
    if (!controllerInfo) continue;
    contentRecords.push(`export interface ${className} extends ${controllerInfo.controllerClassName} {}`);
  }
  const content = `/** styles: begin */
declare module 'zova-module-${moduleName}' {
  ${contentRecords.join('\n')} 
}  
/** styles: end */
`;
  return content;
}

function _parseControllerInfo(
  _options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
): IControllerInfo | undefined {
  const { fileNameJSRelative } = globFile;
  const matches = fileNameJSRelative.match(/..\/(.+?)\/(.+?)\/style/);
  if (!matches) return;
  const type = matches[1];
  if (!['page', 'component'].includes(type)) return;
  const name = matches[2];
  const nameCapitalize = toUpperCaseFirstChar(name);
  // controllerClassName
  const controllerClassName = `Controller${type === 'page' ? 'Page' : ''}${nameCapitalize}`;
  // ok
  return {
    type,
    name,
    nameCapitalize,
    controllerClassName,
  };
}
