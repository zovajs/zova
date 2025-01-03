import { BeanCliBase } from '@cabloy/cli';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { IGlobBeanFile, IMetadataCustomGenerateOptions, OnionSceneMeta } from '@cabloy/module-info';
import path from 'node:path';

export async function generateMetadataCustom(
  cli: BeanCliBase,
  globFiles: IGlobBeanFile[],
  sceneName: string,
  sceneMeta: OnionSceneMeta,
  moduleName: string,
  modulePath: string,
) {
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  if (globFiles.length === 0) return '';
  // custom
  const jsFile = path.join(sceneMeta.module!.root, sceneMeta.metadataCustom!);
  return await cli.helper.importDynamic(jsFile, async instance => {
    const options: IMetadataCustomGenerateOptions = {
      cli,
      sceneName,
      sceneNameCapitalize,
      sceneMeta,
      moduleName,
      modulePath,
      globFiles,
    };
    return await instance.default(options);
  });
}
