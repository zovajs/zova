import type { Pinia, StateTree } from 'pinia';
import type { Functionable } from 'zova';

import 'zova';

export type PiniaStore<P extends Functionable> = ReturnType<P>;

declare module 'zova' {
  export interface BeanBase {
    $pinia: Pinia;
  }

  export interface SSRContextStateDefer {
    pinia: Record<string, StateTree>;
  }
}
