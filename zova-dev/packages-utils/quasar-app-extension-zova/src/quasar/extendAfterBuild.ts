import type { IndexAPI } from '@quasar/app-vite';
import type { ConfigContext, QuasarConf } from './types.js';
import path from 'node:path';
import fse from 'fs-extra';
import { getOutDir } from 'zova-vite';

export function extendAfterBuild(context: ConfigContext, _flavor: string) {
  return async function extendAfterBuild(_conf: QuasarConf, _api: IndexAPI) {
    // remove dist/ssr/server
    fse.removeSync(path.join(getOutDir(), 'server'));
    // remove zova/runtime
    fse.removeSync(path.join(context.configOptions!.appDir, context.configOptions!.runtimeDir));
  };
}
