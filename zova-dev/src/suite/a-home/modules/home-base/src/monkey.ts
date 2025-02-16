import type { BeanBase, BeanContainer, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { BeanSimple } from 'zova';
import { __ThisModule__ } from './.metadata/this.js';
import { ServiceRouter } from './service/router.js';
import { ServiceSsr } from './service/ssr.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  serviceRouter: ServiceRouter;
  serviceSsr: ServiceSsr;

  async appInitialize() {
    // router
    this.serviceRouter = await this.bean._newBean(ServiceRouter, false);
    // ssr
    this.serviceSsr = await this.bean._newBean(ServiceSsr, false);
    await this.serviceSsr.initialize();
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    // $scopeBase
    bean.defineProperty(beanInstance, '$scopeBase', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.bean.scope(__ThisModule__);
      },
    });
  }
}
