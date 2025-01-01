import path from 'node:path';
import { getScopeModuleName, globAllTsFiles } from './utils.js';

export async function generateScopeModule(moduleName: string, modulePath: string) {
  const scopeModuleName = getScopeModuleName(moduleName);
  const globFiles = await globAllTsFiles(moduleName, modulePath);
  if (globFiles.length === 0) return '';
  //
  const contentExports: string[] = [];
  const contentScopes: string[] = [];
  const metadataFile = path.join(modulePath, 'src/.metadata');
  for (const globFile of globFiles) {
    const { file, fileContent, isVirtual } = globFile;
    if (!isVirtual) {
      const matches = fileContent.match(/\s@[\s\S]*?export class (.*?) extends/);
      if (matches) {
        let className = matches[1];
        const pos = fileContent.indexOf('<');
        if (pos > -1) {
          className = className.substring(0, pos);
        }
        const fileRelative = path
          .relative(metadataFile, file)
          .replace(/\\/g, '/')
          .replace('.ts', '.js')
          .replace('.tsx', '.jsx');
        contentExports.push(`export * from '${fileRelative}';`);
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
${contentExports.join('\n')}  
declare module 'zova-module-${moduleName}' {
  ${contentScopes.join('\n')} 
}
/** scope module: end */
`;
  return content;
}
