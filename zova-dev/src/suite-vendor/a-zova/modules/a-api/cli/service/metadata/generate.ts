import path from 'path';
import fse from 'fs-extra';
import { IMetadataCustomGenerateOptions } from '@cabloy/module-info';

export default async function (options: IMetadataCustomGenerateOptions): Promise<string> {
  const { modulePath } = options;
  const contentExports: string[] = [];
  // openapi
  if (fse.existsSync(path.join(modulePath, 'src/service/openapi/index.ts'))) {
    contentExports.push("export * from '../service/openapi/index.js';");
  }
  // combine
  const content = `/** openapi: begin */
${contentExports.join('\n')}
/** openapi: end */
`;
  return content;
}
