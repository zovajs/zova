import type { ZovaSys } from '../core/sys/sys.js';

import { sys } from '../core/sys/sys.js';

export function useSys(): ZovaSys {
  return sys;
}
