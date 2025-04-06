import type { IndexAPI } from '@quasar/app-vite';
import type { ConfigContext, QuasarConf } from './types.js';

export function extendAfterBuild(_context: ConfigContext, _flavor: string) {
  return async function extendAfterBuild(_conf: QuasarConf, _api: IndexAPI) {
  };
}
