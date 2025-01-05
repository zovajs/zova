import { IGlobBeanFile, IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { IControllerInfo } from './types.js';

export function generateMetaPage(
  _options: IMetadataCustomGenerateOptions,
  _globFiles: [IGlobBeanFile, IControllerInfo][],
) {
  return '// -- page -- ';
}
