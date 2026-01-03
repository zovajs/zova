import path from 'node:path';
import fse from 'fs-extra';
import { globby } from 'globby';
import { optimize } from 'svgo';
import { generateRestIndex } from './utils.ts';

export async function generateIcons(moduleName: string, modulePath: string) {
  const iconsSrc = path.join(modulePath, 'icons');
  // groups
  const groups = await _resolveGroups(iconsSrc);
  for (const group of groups) {
    group.iconNames = await _generateIconsGroup(modulePath, iconsSrc, moduleName, group.name);
  }
  if (groups.length === 0) return '';
  // src/resource/icons.ts
  const resourceIcons = await _generateFileResourceIcons(groups, moduleName);
  // src/config/icons.ts
  const configIcons = await _generateFileConfigIcons(groups);
  // combine
  const content = `/** icons: begin */
${configIcons}
import 'zova-module-a-icon';
declare module 'zova-module-a-icon' {
${resourceIcons}
}
/** icons: end */
`;
  // restComponent
  await generateRestIcon(moduleName, modulePath, resourceIcons);
  // ok
  return content;
}

async function generateRestIcon(_moduleName: string, modulePath: string, resourceIcons: string) {
  // icons
  const fileIcons = path.join(modulePath, 'rest/icons.ts');
  await fse.outputFile(fileIcons, resourceIcons);
  // index
  const exportIndexContent = 'export * from \'./icons.js\';';
  await generateRestIndex(modulePath, exportIndexContent);
}

async function _generateFileConfigIcons(groups) {
  const groupsFrontImport: string[] = [];
  const groupsFrontExport: string[] = [];
  for (const group of groups) {
    groupsFrontImport.push(`import icon_${group.name} from './icons/groups/${group.name}.svg';`);
    groupsFrontExport.push(`${group.name}: icon_${group.name},`);
  }
  const jsContent = `${groupsFrontImport.join('\n')}\n\nexport const icons = {\n  ${groupsFrontExport.join('\n  ')}\n};\n`;
  return jsContent;
}

async function _generateFileResourceIcons(groups, moduleName) {
  const groupsFrontExport: string[] = [];
  for (const group of groups) {
    for (const iconName of group.iconNames) {
      const recordId = _getRecordId(moduleName, group.name, iconName);
      groupsFrontExport.push(`'${recordId}': true;`);
    }
  }
  const jsContent = `export interface IIconRecord {
  ${groupsFrontExport.join('\n    ').trim()}
}
`;
  return jsContent;
}

async function _resolveGroups(iconsSrc: string) {
  const groupPaths = await globby('*', { cwd: iconsSrc, onlyDirectories: true });
  groupPaths.sort();
  return groupPaths.map(item => {
    return {
      name: item,
      iconNames: [] as string[],
    };
  });
}

async function _generateIconsGroup(modulePath: string, iconsSrc: string, moduleName: string, groupName: string) {
  // icons
  const files = await globby(`${groupName}/*.svg`, { cwd: iconsSrc });
  files.sort();
  const iconNames = files.map(item => path.basename(item, '.svg'));
  // symbols
  const symbols: string[] = [];
  for (let index = 0; index < files.length; index++) {
    const file = path.join(iconsSrc, files[index]);
    const iconName = iconNames[index];
    const symbol = await _combineSymbol(file, moduleName, groupName, iconName);
    symbols.push(symbol);
  }
  // xml
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
${symbols.join('\n')}
</svg>`;
  // write
  const pathDest = path.join(modulePath, 'src/.metadata/icons', 'groups');
  await fse.ensureDir(pathDest);
  const fileDest = path.join(pathDest, `${groupName}.svg`);
  await fse.writeFile(fileDest, xml);
  // ok
  return iconNames;
}

async function _combineSymbol(file, moduleName, groupName, iconName): Promise<string> {
  // load
  let content = (await fse.readFile(file)).toString();
  // optimize
  const { data } = await optimize(content, {});
  content = data || content;
  content = content.replace(/<svg(.*?)>/, (_, $1) => {
    const $2 = $1.replace(/ width=".*?"/, '').replace(/ height=".*?"/, '');
    return `<symbol id="${_getSymbolId(moduleName, groupName, iconName)}"${$2}>`;
  }).replace('</svg>', '</symbol>');
  return content;
}

function _getSymbolId(moduleName: string, groupName: string, iconName: string) {
  return `zova-svg-icon-${moduleName}-${groupName}-${iconName}`;
}

function _getRecordId(moduleName: string, groupName: string, iconName: string) {
  if (moduleName === 'home-icon') moduleName = '';
  if (groupName === 'default') groupName = '';
  return `${moduleName}:${groupName}:${iconName}`;
}

// import SVGCompiler from 'svg-baker';
// const svgSymbol = await new SVGCompiler().addSymbol({
//   id: _getSymbolId(moduleName, groupName, iconName),
//   content,
//   path: file,
// });
// content = svgSymbol.render();
