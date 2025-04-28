import type { BeanBase, BeanContainer, IMonkeyAppContextInitialize, IMonkeyBeanInit, ZovaContext } from 'zova';
import { BeanSimple } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyAppContextInitialize, IMonkeyBeanInit {
  appContextInitialize(ctx: ZovaContext): void {
    ctx.meta.$ssr = ctx.app.ctx.meta.$ssr;
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    // $fetch
    bean.defineProperty(beanInstance, '$ssr', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.ctx.meta.$ssr;
      },
    });
  }
}
