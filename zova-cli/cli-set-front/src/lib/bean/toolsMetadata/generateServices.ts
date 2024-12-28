import path from 'path';
import fse from 'fs-extra';
import eggBornUtils from 'egg-born-utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateServices(modulePath: string) {
  const pattern = `${modulePath}/src/service/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentExports: string[] = [];
  const contentImports: string[] = [];
  const contentServices: string[] = [];
  // openapi
  if (fse.existsSync(path.join(modulePath, 'src/service/openapi/index.ts'))) {
    contentExports.push("export * from '../service/openapi/index.js';");
  }
  // files
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileName.startsWith('_')) continue;
    const parts = fileName.split('.').slice(0, -1);
    const serviceName = parts[parts.length - 1];
    const className = 'Service' + toUpperCaseFirstChar(serviceName);
    contentExports.push(`export * from '../service/${serviceName}.js';`);
    contentImports.push(`import { ${className} } from '../service/${serviceName}.js';`);
    contentServices.push(`'${serviceName}': ${className};`);
  }
  // combine
  const content = `/** service: begin */
${contentExports.join('\n')}
${contentImports.join('\n')}
export interface IModuleService {
  ${contentServices.join('\n')}
};
/** service: end */
`;
  return content;
}
