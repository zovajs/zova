import type { IndexAPI } from '@quasar/app-vite';
import type { BuildOptions } from 'esbuild';
import type { ConfigContext } from './types.js';
export declare function extendSSRWebserverConf(_context: ConfigContext): (conf: BuildOptions, _api: IndexAPI) => void;
