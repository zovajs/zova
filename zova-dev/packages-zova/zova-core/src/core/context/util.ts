import { setCurrentInstance } from '@cabloy/vue-runtime-core';
import { pauseTracking, resetTracking } from '@vue/reactivity';

import { BeanSimple } from '../../bean/beanSimple.ts';

export class CtxUtil extends BeanSimple {
  instanceScope(fn, tracking?: boolean) {
    if (this.ctx.disposed) {
      const error = new Error();
      error.code = 600;
      throw error;
    }
    const reset = setCurrentInstance(this.ctx.instance as any);
    if (!tracking) {
      pauseTracking();
    }
    try {
      return fn();
    } finally {
      if (!tracking) {
        resetTracking();
      }
      reset();
    }
  }
}
