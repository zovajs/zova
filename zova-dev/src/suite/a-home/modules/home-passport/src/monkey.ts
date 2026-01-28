import type { BeanBase, BeanContainer, IMonkeyBeanInit } from 'zova';
import type { ModelPassport } from './model/passport.js';
import { BeanSimple } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyBeanInit {
  private $$modelPassport: ModelPassport;

  async getModelPassport() {
    if (!this.$$modelPassport) {
      this.$$modelPassport = await this.bean._getBean('home-passport.model.passport', true);
    }
    return this.$$modelPassport;
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$passport', {
      enumerable: false,
      configurable: true,
      get() {
        return this.$$modelPassport;
      },
    });
  }
}
