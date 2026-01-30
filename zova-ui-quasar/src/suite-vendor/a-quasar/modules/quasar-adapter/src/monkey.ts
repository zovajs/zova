import type { BeanBase, BeanContainer, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import type { ScopeModuleAStyle } from 'zova-module-a-style';
import { BeanSimple } from 'zova';
import { LocalIcon } from './bean/local.icon.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  async appInitialize() {

  }

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
