import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import path from 'node:path';
import fse from 'fs-extra';

export interface IControllerInfo {
  type: string;
  name: string;
  nameCapitalize: string;
  controllerClassName: string;
  styleClassName: string;
  hasStyleFirst: boolean;
}

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { moduleName, globFiles } = options;
  const contentRecords: string[] = [];
  for (const globFile of globFiles) {
    if (globFile.isIgnore) continue;
    const { className } = globFile;
    const controllerInfo = _parseControllerInfo(options, globFile);
    if (!controllerInfo) continue;
    if (controllerInfo.hasStyleFirst) {
      contentRecords.push(`export interface ${className} extends ${controllerInfo.styleClassName} {}`);
    } else {
      contentRecords.push(`export interface ${className} extends ${controllerInfo.controllerClassName} {}`);
    }
  }
  const content = `/** renders: begin */
declare module 'zova-module-${moduleName}' {
  ${contentRecords.join('\n')} 
}  
/** renders: end */
`;
  return content;
}

function _parseControllerInfo(
  options: IMetadataCustomGenerateOptions,
  globFile: IGlobBeanFile,
): IControllerInfo | undefined {
  const { fileNameJSRelative } = globFile;
  const matches = fileNameJSRelative.match(/..\/(.+?)\/(.+?)\/render/);
  if (!matches) return;
  const type = matches[1];
  if (!['page', 'component'].includes(type)) return;
  const name = matches[2];
  const nameCapitalize = toUpperCaseFirstChar(name);
  // controllerClassName
  const controllerClassName = `Controller${type === 'page' ? 'Page' : ''}${nameCapitalize}`;
  // styleClassName
  const styleClassName = `Style${type === 'page' ? 'Page' : ''}${nameCapitalize}`;
  const fileStyle = path.join(options.modulePath, `src/${type}/${name}/style.ts`);
  const hasStyleFirst = fse.existsSync(fileStyle);
  // ok
  return {
    type,
    name,
    nameCapitalize,
    controllerClassName,
    styleClassName,
    hasStyleFirst,
  };
}
