import type { BeanBase, BeanContainer, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';

import { BeanSimple } from 'zova';

import { ServicePinia } from './service/pinia.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  pinia: ServicePinia;

  async appInitialize() {
    // pinia
    this.pinia = await this.bean._newBean(ServicePinia, false);
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$pinia', {
      enumerable: false,
      configurable: true,
      get() {
        return self.pinia.pinia;
      },
    });
  }
}
