import type { IModule } from '@cabloy/module-info';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import fse from 'fs-extra';

export function getControllerFileName(module: IModule, type: 'page' | 'component', beanName) {
  const controllerFile = path.join(module.root, `src/${type}/${beanName}/controller.ts`);
  if (fs.existsSync(controllerFile)) {
    return 'controller.ts';
  }
  return 'controller.tsx';
}

export function copyTemplateIfNeed(fileSrc, fileDest) {
  if (!fse.existsSync(fileDest)) {
    fse.copyFileSync(fileSrc, fileDest);
  }
}

export function pathToHref(fileName: string): string {
  return pathToFileURL(fileName).href;
}
