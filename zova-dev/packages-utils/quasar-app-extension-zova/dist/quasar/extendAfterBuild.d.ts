import type { IndexAPI } from '@quasar/app-vite';
import type { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import type { ConfigContext } from './types.js';
export declare function extendAfterBuild(context: ConfigContext, _flavor: string): (conf: QuasarConf, api: IndexAPI) => Promise<void>;
