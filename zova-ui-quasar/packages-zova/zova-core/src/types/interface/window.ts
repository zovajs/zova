import type { ZovaSys } from '../../core/sys/sys.js';

declare global {
  interface Window {
    sys: ZovaSys;
  }
}
