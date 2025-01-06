import path from 'node:path';
import fs from 'node:fs';
import { IModule } from '@cabloy/module-info';

export function getControllerFileName(module: IModule, type: 'page' | 'component', beanName) {
  const controllerFile = path.join(module.root, `src/${type}/${beanName}/controller.ts`);
  if (fs.existsSync(controllerFile)) {
    return 'controller.ts';
  }
  return 'controller.tsx';
}
