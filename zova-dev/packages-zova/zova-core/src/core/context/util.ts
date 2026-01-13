import type { RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import { routerViewLocationKey } from '@cabloy/vue-router';
import { setCurrentInstance } from '@cabloy/vue-runtime-core';
import { pauseTracking, resetTracking } from '@vue/reactivity';
import { inject } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { pageRouteKey } from '../../utils/route.js';

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

  getPageRoute(): RouteLocationNormalizedLoadedGeneric | undefined {
    let route = this.bean._getBeanFromHost({ name: pageRouteKey, injectionScope: 'host' });
    if (!route) {
      route = this.ctx.util.instanceScope(() => {
        return inject(routerViewLocationKey)?.value;
      });
    }
    return route as RouteLocationNormalizedLoadedGeneric | undefined;
  }
}
