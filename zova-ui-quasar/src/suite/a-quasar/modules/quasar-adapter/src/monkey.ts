import type { BeanBase, BeanContainer, IMonkeyBeanInit } from 'zova';

import { BeanSimple } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyBeanInit {
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$q', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.vue.config.globalProperties.$q;
      },
    });
  }
}
