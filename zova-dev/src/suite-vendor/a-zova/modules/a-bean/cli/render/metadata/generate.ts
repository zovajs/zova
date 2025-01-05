import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
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
    const renderInfo = _parseRenderInfo(options, globFile);
    if (!renderInfo) continue;
    contentRecords.push(`export interface ${className} extends ${renderInfo.controllerClassName} {}`);
  }
  const content = `/** renders: begin */
declare module 'zova-module-${moduleName}' {
  ${contentRecords.join('\n')} 
}  
/** renders: end */
`;
  return content;
}

function _parseRenderInfo(
  _options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
): IControllerInfo | undefined {
  const { fileNameJSRelative } = globFile;
  const matches = fileNameJSRelative.match(/..\/(.+?)\/(.+?)\/controller/);
  if (!matches) return;
  const type = matches[1];
  const name = matches[2];
  const nameCapitalize = toUpperCaseFirstChar(name);
  // controllerClassName
  const controllerClassName = `Controller${type === 'page' ? 'Page' : ''}nameCapitalize`;
  // ok
  return {
    type,
    name,
    nameCapitalize,
    controllerClassName,
  };
}
