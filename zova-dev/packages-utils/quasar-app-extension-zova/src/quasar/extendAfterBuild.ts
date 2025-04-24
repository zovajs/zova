import type { IndexAPI } from '@quasar/app-vite';
import type { ConfigContext, QuasarConf } from './types.js';
import path from 'node:path';
import fse from 'fs-extra';
import { getOutDir, getOutReleasesDir } from 'zova-vite';

export function extendAfterBuild(context: ConfigContext, _flavor: string) {
  return async function extendAfterBuild(_conf: QuasarConf, _api: IndexAPI) {
    const outDir = getOutDir();
    // remove dist/ssr/server
    fse.removeSync(path.join(context.configOptions!.appDir, outDir, 'server'));
    // remove zova/runtime
    fse.removeSync(path.join(context.configOptions!.appDir, context.configOptions!.runtimeDir));
    // copy
    const outReleasesDir = path.join(context.configOptions!.appDir, getOutReleasesDir());
    fse.removeSync(outReleasesDir);
    fse.copySync(
      path.join(context.configOptions!.appDir, outDir),
      outReleasesDir,
    );
  };
}
