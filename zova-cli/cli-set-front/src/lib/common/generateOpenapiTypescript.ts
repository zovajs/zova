import { createRequire } from 'node:module';
import path from 'node:path';
import fse from 'fs-extra';
import { copyTemplateIfNeed } from './utils.ts';

const __ImportOpenapiTypescript = 'openapi-typescript';

export async function generateOpenapiTypescript() {
  await __generateOperationObject();
}

async function __generateOperationObject() {
  const pathOpenapiTypescript = parseOpenapiTypescriptPath();
  const fileSrc = path.join(pathOpenapiTypescript, 'transform/operation-object.mjs');
  const fileSrcBak = path.join(pathOpenapiTypescript, 'transform/operation-object-origin.mjs');
  copyTemplateIfNeed(fileSrc, fileSrcBak);
  const content = fse.readFileSync(fileSrcBak).toString();
  const contentNew = content
    .replace(', NEVER', ', NEVER, TRUE')
    .replace(
      'return type;',
      `if(operationObject.security){
    const securityItem=operationObject.security.find(item=>!!item.bearerAuth);
    if(securityItem){
      type.push(
        ts.factory.createPropertySignature(
          /* modifiers     */
          tsModifiers({ readonly: options.ctx.immutable }),
          /* name          */
          tsPropertyIndex("authToken"),
          /* questionToken */
          void 0,
          /* type          */
          TRUE
        )
      )
    }
  }
  return type;`,
    );
  fse.writeFileSync(fileSrc, contentNew);
}

function parseOpenapiTypescriptPath() {
  const require = createRequire(import.meta.url);
  const fileCoreIndex = require.resolve(__ImportOpenapiTypescript);
  return path.dirname(fileCoreIndex);
}
