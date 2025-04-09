import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { IGlobBeanFile } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export interface IControllerInfo {
  type: string;
  name: string;
  nameCapitalize: string;
  controllerClassName: string;
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
