import type { IModule } from '@cabloy/module-info';
import fs from 'node:fs';
import path from 'node:path';

export function getControllerFileName(module: IModule, type: 'page' | 'component', beanName) {
  const controllerFile = path.join(module.root, `src/${type}/${beanName}/controller.ts`);
  if (fs.existsSync(controllerFile)) {
    return 'controller.ts';
  }
  return 'controller.tsx';
}
