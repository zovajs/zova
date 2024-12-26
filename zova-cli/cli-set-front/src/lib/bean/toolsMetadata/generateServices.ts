import path from 'path';
import eggBornUtils from 'egg-born-utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

export async function generateServices(modulePath: string) {
  const pattern = `${modulePath}/src/service/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  if (files.length === 0) return '';
  files.sort();
  const contentImports: string[] = [];
  const contentServices: string[] = [];
  for (const file of files) {
    const fileName = path.basename(file);
    if (fileName.startsWith('_')) continue;
    const parts = fileName.split('.').slice(0, -1);
    const serviceName = parts[parts.length - 1];
    const className = 'Service' + toUpperCaseFirstChar(serviceName);
    contentImports.push(`import ${className} from '../service/${serviceName}.js';`);
    contentServices.push(`'${serviceName}': ${className},`);
  }
  // combine
  const content = `/** service: begin */
${contentImports.join('\n')}
export const services = {
  ${contentServices.join('\n')}
};
/** service: end */
`;
  return content;
}
