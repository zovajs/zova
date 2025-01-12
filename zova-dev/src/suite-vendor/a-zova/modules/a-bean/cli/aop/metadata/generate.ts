import path from 'path';
// import fse from 'fs-extra';
import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { BeanCliBase } from '@cabloy/cli';
// import { getPropertyObject } from '@cabloy/utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const cli = options.cli as BeanCliBase;
  const { modulePath, globFiles } = options;
  if (globFiles.length === 0) return '';
  const pkgFile = path.join(modulePath, 'package.json');
  const pkg = await cli.helper.loadJSONFile(pkgFile);
  if (!pkg.zovaModule) pkg.zovaModule = {};
  if (!pkg.zovaModule.capabilities) pkg.zovaModule.capabilities = {};
  // const nodeAops = getPropertyObject(pkg, 'zovaModule.capabilities.aops');
  for (const { beanName, beanNameFull, fileContent } of globFiles) {
    const matches = fileContent.match(/@Aop\((\{[\s\S]*?\})\)\s*?export class/);
    if (!matches) throw new Error(`aop options parser error: ${beanNameFull}`);
    const aopOptions = matches[1];
    console.log(beanName, aopOptions);
  }
  // ok
  return '';
}
