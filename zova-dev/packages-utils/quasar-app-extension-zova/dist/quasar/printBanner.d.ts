import type { IndexAPI } from '@quasar/app-vite';
import type { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import type { ConfigContext } from './types.js';
export declare function printBanner(_context: ConfigContext, flavor: string): (_conf: QuasarConf, api: IndexAPI) => Promise<void>;
