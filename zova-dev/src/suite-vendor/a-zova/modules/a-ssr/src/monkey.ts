import type { BeanBase, BeanContainer, IMonkeyAppContextInitialize, IMonkeyBeanInit, ZovaContext } from 'zova';
import type { SSRMetaOptions } from './types/ssr.js';
import { BeanSimple, cast } from 'zova';
import { useMeta } from './lib/useMeta.js';

export class Monkey extends BeanSimple implements IMonkeyAppContextInitialize, IMonkeyAppInitialize, IMonkeyBeanInit {
  appContextInitialize(ctx: ZovaContext): void {
    ctx.meta.$ssr = ctx.app.ctx.meta.$ssr;
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    // $ssr
    bean.defineProperty(beanInstance, '$ssr', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.ctx.meta.$ssr;
      },
    });
    // $useMeta
    bean.defineProperty(beanInstance, '$useMeta', {
      enumerable: false,
      configurable: true,
      get() {
        return function (this: BeanBase, options: SSRMetaOptions | (() => SSRMetaOptions)) {
          const ctx: ZovaContext = cast(this).ctx;
          ctx.util.instanceScope(() => {
            useMeta(ctx, options);
          });
        };
      },
    });
  }
}
