import { getScopeModuleName, globAllTsFiles } from './utils.js';

export async function generateScopeModule(moduleName: string, modulePath: string) {
  const scopeModuleName = getScopeModuleName(moduleName);
  const globFiles = await globAllTsFiles(moduleName, modulePath);
  if (globFiles.length === 0) return '';
  //
  const contentScopes: string[] = [];
  for (const globFile of globFiles) {
    const { fileContent, isVirtual } = globFile;
    if (!isVirtual) {
      const matches = fileContent.match(/\s@[\s\S]*?export class (.*?) extends/);
      if (matches) {
        let className = matches[1];
        const pos = fileContent.indexOf('<');
        if (pos > -1) {
          className = className.substring(0, pos);
        }
        contentScopes.push(`
          export interface ${className} {
            /** @internal */
            get scope(): ${scopeModuleName};
          }`);
      }
    }
  }
  // combine
  const content = `/** scope module: begin */
declare module 'zova-module-${moduleName}' {
  ${contentScopes.join('\n')} 
}
/** scope module: end */
`;
  return content;
}
