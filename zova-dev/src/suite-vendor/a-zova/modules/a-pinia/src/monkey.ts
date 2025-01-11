import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { ServicePinia } from './bean/service.pinia.js';

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
