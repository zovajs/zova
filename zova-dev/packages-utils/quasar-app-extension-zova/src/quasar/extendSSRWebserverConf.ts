import type { IndexAPI } from '@quasar/app-vite';
import type { BuildOptions } from 'esbuild';
import type { ConfigContext } from './types.js';

export function extendSSRWebserverConf(_context: ConfigContext) {
  return function extendSSRWebserverConf(conf: BuildOptions, _api: IndexAPI) {
    conf.minify = process.env.BUILD_MINIFY === 'true';
    conf.bundle = true;
    conf.external = [];
  };
}
