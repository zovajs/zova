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
  const nodeOnionsConfig = getPropertyObject<{}>(pkg, 'zovaModule.onionsConfig')!;
  const nodeAops = (nodeOnionsConfig['aop'] = {});
  for (const { beanName, beanNameFull, fileContent } of globFiles) {
    const matches = fileContent.match(/@Aop\((\{[\s\S]*?\})\)\s*?export class/);
    if (!matches) throw new Error(`aop options parser error: ${beanNameFull}`);
    const aopOptions = evaluate(matches[1]);
    nodeAops[beanName] = {};
    for (const key of ['enable', 'meta']) {
      if (aopOptions[key] !== undefined) nodeAops[beanName][key] = aopOptions[key];
    }
    for (const key of ['match', 'ignore']) {
      if (aopOptions[key] !== undefined) {
        let value = aopOptions[key];
        if (Array.isArray(value)) {
          value = value.map(item => (typeof item === 'string' ? item : item.toString()));
        } else {
          value = typeof value === 'string' ? value : value.toString();
        }
        nodeAops[beanName][key] = value;
      }
    }
  }
  await cli.helper.saveJSONFile(pkgFile, pkg);
  // ok
  return '';
}
