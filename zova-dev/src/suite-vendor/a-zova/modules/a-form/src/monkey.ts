import type { BeanBase, BeanContainer, IMonkeyBeanInit, ZovaContext } from 'zova';
import { useForm } from '@tanstack/vue-form';
import { markRaw } from 'vue';
import { BeanSimple, cast } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyBeanInit {
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$useForm', {
      enumerable: false,
      configurable: true,
      get() {
        return function (...args) {
          return self._patchUseForm(beanInstance, ...args);
        };
      },
    });
  }

  _patchUseForm(beanInstance: BeanBase, ...args) {
    const ctx = cast(beanInstance).ctx as ZovaContext;
    return ctx.util.instanceScope(() => {
      return markRaw(useForm(...args));
    });
  }
}
