import { createRequire } from 'node:module';

export function getAbsolutePathOfModule(id: string, postfix: string = 'index.js') {
  const require = createRequire(import.meta.url);
  let modulePath = require.resolve(id);
  if (postfix) {
    const pos = modulePath.lastIndexOf(postfix);
    if (pos > -1) {
      modulePath = modulePath.substring(0, modulePath.length - postfix.length - 1);
    }
  }
  return modulePath;
}
