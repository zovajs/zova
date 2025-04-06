import type { IndexAPI } from '@quasar/app-vite';
import type { BuildOptions } from 'esbuild';
import type { ConfigContext } from './types.js';
import { getOutDir } from 'zova-vite';

export function extendSSRWebserverConf(_context: ConfigContext) {
  return function extendSSRWebserverConf(conf: BuildOptions, api: IndexAPI) {
    conf.minify = process.env.BUILD_MINIFY === 'true';
    conf.keepNames = true;
    conf.bundle = true;
    conf.external = [];
    conf.banner = { js: 'import { createRequire } from \'module\';const require = createRequire(import.meta.url);' };
    conf.entryPoints = [
      { in: (api.resolve as any).entry('ssr-prod-webserver.js'), out: 'index.js' },
      { in: (api.resolve as any).entry('ssr-prod-handler.js'), out: 'entry.js' },
    ];
    conf.outdir = getOutDir();
    delete conf.outfile;
  };
}
