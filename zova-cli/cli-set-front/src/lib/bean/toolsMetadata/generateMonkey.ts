import path from 'node:path';
import fse from 'fs-extra';

export async function generateMonkey(modulePath: string) {
  const monkeyFile = path.join(modulePath, 'src/monkey.ts');
  if (!fse.existsSync(monkeyFile)) return '';
  // combine
  const content = `/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
`;
  return content;
}

export async function generateMain(modulePath: string) {
  const monkeyFile = path.join(modulePath, 'src/main.ts');
  if (!fse.existsSync(monkeyFile)) return '';
  // combine
  const content = `/** main: begin */
export * from '../main.js';
/** main: end */
`;
  return content;
}
