import type { UserConfig as ViteUserConfig } from 'vite';
import type { ConfigContext } from './types.js';
export declare function extendViteConf(context: ConfigContext): (conf: ViteUserConfig, opts: any) => void;
