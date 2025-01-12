import path from 'path';
import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';
import { BeanCliBase } from '@cabloy/cli';
import { evaluate, getPropertyObject } from '@cabloy/utils';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const cli = options.cli as BeanCliBase;
  const { modulePath, globFiles } = options;
  if (globFiles.length === 0) return '';
  const pkgFile = path.join(modulePath, 'package.json');
  const pkg = await cli.helper.loadJSONFile(pkgFile);
  const nodeCapabilities = getPropertyObject<{}>(pkg, 'zovaModule.capabilities')!;
  const nodeAops = (nodeCapabilities['aops'] = {});
  for (const { beanName, beanNameFull, fileContent } of globFiles) {
    const matches = fileContent.match(/@Aop\((\{[\s\S]*?\})\)\s*?export class/);
    if (!matches) throw new Error(`aop options parser error: ${beanNameFull}`);
    const aopOptions = evaluate(matches[1]);
    nodeAops[beanName] = {};
    if (aopOptions.match) nodeAops[beanName].match = aopOptions.match;
    if (aopOptions.ignore) nodeAops[beanName].ignore = aopOptions.ignore;
  }
  await cli.helper.saveJSONFile(pkgFile, pkg);
  // ok
  return '';
}
