import { setCurrentInstance } from '@cabloy/vue-runtime-core';
import { pauseTracking, resetTracking } from '@vue/reactivity';
import { HttpStatus } from 'zova';
import { BeanSimple } from '../../bean/beanSimple.js';

export class CtxUtil extends BeanSimple {
  instanceScope(fn, tracking?: boolean) {
    if (!this.ctx.instance) {
      const error = new Error();
      error.code = HttpStatus.COMPONENT_UNMOUNTED;
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
