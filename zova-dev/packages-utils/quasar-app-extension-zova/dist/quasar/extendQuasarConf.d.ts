import type { ZovaMetaFlavor } from '@cabloy/module-info';
import type { IndexAPI } from '@quasar/app-vite';
import type { QuasarConf } from '@quasar/app-vite/types/configuration/conf.js';
import type { ConfigContext } from './types.js';
export declare function extendQuasarConf(context: ConfigContext, flavor: ZovaMetaFlavor): (conf: QuasarConf, api: IndexAPI) => Promise<void>;
