import { BeanCliBase } from '@cabloy/cli';
import { IGlobBeanFile, OnionScenesMeta } from '@cabloy/module-info';
import { evaluate, getPropertyObject } from '@cabloy/utils';
import path from 'node:path';

export async function generateOptionsPackage(
  cli: BeanCliBase,
  globFiles: IGlobBeanFile[],
  onionScenesMeta: OnionScenesMeta,
  _moduleName: string,
  modulePath: string,
) {
  let changed = false;
  const cacheNodeMap = {};
  const pkgFile = path.join(modulePath, 'package.json');
  const pkg = await cli.helper.loadJSONFile(pkgFile);
  const nodeOnionsConfig = getPropertyObject<{}>(pkg, 'zovaModule.onionsConfig')!;
  function getCacheNodeScene(sceneName) {
    if (!cacheNodeMap[sceneName]) {
      cacheNodeMap[sceneName] = nodeOnionsConfig[sceneName] = {};
    }
    return cacheNodeMap[sceneName];
  }
  for (const { sceneName, sceneNameCapitalize, beanName, beanNameFull, fileContent } of globFiles) {
    const sceneMeta = onionScenesMeta[sceneName];
    if (!sceneMeta.optionsPackage) continue;
    changed = true;
    const matches = fileContent.match(new RegExp(`@${sceneNameCapitalize}\\((\\{[\\s\\S]*?\\})\\)\\s*?export class`));
    if (!matches) throw new Error(`${sceneName} options parser error: ${beanNameFull}`);
    const onionOptions = evaluate(matches[1]);
    const nodeScene = getCacheNodeScene(sceneName);
    nodeScene[beanName] = {};
    for (const key of ['enable', 'meta', 'dependencies', 'dependents']) {
      if (onionOptions[key] !== undefined) nodeScene[beanName][key] = onionOptions[key];
    }
    for (const key of ['match', 'ignore']) {
      if (onionOptions[key] !== undefined) {
        let value = onionOptions[key];
        if (Array.isArray(value)) {
          value = value.map(item => (typeof item === 'string' ? item : item.toString()));
        } else {
          value = typeof value === 'string' ? value : value.toString();
        }
        nodeScene[beanName][key] = value;
      }
    }
  }
  if (changed) {
    await cli.helper.saveJSONFile(pkgFile, pkg);
  }
  // ok
  return '';
}
