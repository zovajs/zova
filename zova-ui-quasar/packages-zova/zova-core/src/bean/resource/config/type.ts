import type { ZovaSys } from '../../../core/sys/sys.js';

export type TypeModuleConfig<T extends (sys: ZovaSys) => object> = ReturnType<T>;
