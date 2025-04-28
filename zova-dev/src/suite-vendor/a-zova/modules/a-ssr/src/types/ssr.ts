import type { CtxSSR } from '../lib/ssr.js';
import 'zova';

declare module 'zova' {
  export interface CtxMeta {
    $ssr: CtxSSR;
  }
}
