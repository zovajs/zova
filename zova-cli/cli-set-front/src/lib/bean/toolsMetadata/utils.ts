import { IGlobBeanFile, IGlobTsFile, OnionSceneMeta } from '@cabloy/module-info';
import { skipPrefix, stringToCapitalize, toLowerCaseFirstChar, toUpperCaseFirstChar } from '@cabloy/word-utils';
import path from 'path';
import fse from 'fs-extra';
import eggBornUtils from 'egg-born-utils';

export function checkIgnoreOfParts(parts: string[]) {
  const indexLast = parts.length - 1;
  if (parts[indexLast].endsWith('_')) {
    parts[indexLast] = parts[indexLast].substring(0, parts[indexLast].length - 1);
    return true;
  }
  return false;
}

export function getScopeModuleName(moduleName: string) {
  return `ScopeModule${stringToCapitalize(moduleName, '-')}`;
}

export async function globAllTsFiles(moduleName: string, modulePath: string): Promise<IGlobTsFile[]> {
  const result: IGlobBeanFile[] = [];
  const pattern = `${modulePath}/src/**/*.ts(x)?`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return result;
  files.sort();
  const pathMetadata = path.join(modulePath, 'src/.metadata');
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileName.startsWith('_')) continue;
    const isIgnore = fileName.endsWith('_');
    const fileNameJS = fileName.replace('.ts', '.js').replace('.tsx', '.jsx');
    const fileNameJSRelative = path
      .relative(pathMetadata, file)
      .replace(/\\/g, '/')
      .replace('.ts', '.js')
      .replace('.tsx', '.jsx');
    const fileContent = fse.readFileSync(file).toString();
    const isVirtual = fileContent.includes('@Virtual()');
    const matches = fileContent.match(/\s@([^\(]+)[\s\S]*?export class ([\S]+)/);
    if (!matches) continue;
    let className = matches[2];
    const pos = fileContent.indexOf('<');
    if (pos > -1) {
      className = className.substring(0, pos);
    }
    const sceneNameCapitalize = isVirtual ? 'Bean' : matches[1];
    const sceneName = toLowerCaseFirstChar(sceneNameCapitalize);
    const beanName = parseBeanName(className, sceneName);
    const beanNameFull = `${moduleName}:${beanName}`;
    result.push({
      file,
      fileContent,
      fileName,
      fileNameJS,
      fileNameJSRelative,
      className,
      beanName,
      beanNameFull,
      isIgnore,
      isVirtual,
    });
  }
  return result;
}

export function parseBeanName(className: string, scene: string) {
  return skipPrefix(className, scene, true)!;
}

export async function globBeanFiles(
  sceneName: string,
  sceneMeta: OnionSceneMeta,
  moduleName: string,
  modulePath: string,
): Promise<IGlobBeanFile[]> {
  const result: IGlobBeanFile[] = [];
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const pattern = sceneMeta.sceneIsolate
    ? `${modulePath}/src/${sceneName}/*.ts`
    : `${modulePath}/src/bean/${sceneName}.*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return result;
  files.sort();
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileName.startsWith('_')) continue;
    const parts = fileName.split('.').slice(0, -1);
    if (sceneMeta.sceneIsolate && parts.length !== 1) continue;
    if (!sceneMeta.sceneIsolate && parts.length < 2) continue;
    const isIgnore = checkIgnoreOfParts(parts);
    const fileNameJS = fileName.replace('.ts', '.js');
    const fileNameJSRelative = sceneMeta.sceneIsolate ? `../${sceneName}/${fileNameJS}` : `../bean/${fileNameJS}`;
    const className =
      (sceneMeta.sceneIsolate ? sceneNameCapitalize : '') + parts.map(item => toUpperCaseFirstChar(item)).join('');
    const beanName = parts[parts.length - 1];
    const beanNameFull = `${moduleName}:${beanName}`;
    const fileContent = isIgnore ? '' : fse.readFileSync(file).toString();
    const isVirtual = fileContent.includes('@Virtual()');
    result.push({
      file,
      fileContent,
      fileName,
      fileNameJS,
      fileNameJSRelative,
      className,
      beanName,
      beanNameFull,
      isIgnore,
      isVirtual,
    });
  }
  return result;
}

export function extractBeanInfo(sceneName: string, fileContent: string, sceneMeta: OnionSceneMeta) {
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  // optionsCustomInterface
  let optionsCustomInterface: string | undefined;
  let optionsCustomInterfaceFrom: string | undefined;
  let reg = new RegExp(`@${sceneNameCapitalize}<(I${sceneNameCapitalize}Options[^>]*)>`);
  let matches = fileContent.match(reg);
  if (matches) {
    optionsCustomInterface = matches[1];
    //optionsCustomInterfaceFrom
    reg = new RegExp(`import {[\\s\\S]*?${optionsCustomInterface}[, ][\\s\\S]*?} from '([^']*)'`);
    matches = fileContent.match(reg);
    if (matches) {
      optionsCustomInterfaceFrom = matches[1];
    }
  }
  // isGlobal
  const isGlobal = sceneMeta.hasLocal
    ? fileContent.match(/@.*?\(\{([\s\S]*?)global: true([\s\S]*?)\}([\s\S]*?)\)\s*?export class/)
    : true;
  return { optionsCustomInterface, optionsCustomInterfaceFrom, isGlobal };
}
