import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { ServiceRouter } from './bean/service.router.js';
import { ServiceSsr } from './bean/service.ssr.js';
import { __ThisModule__ } from './.metadata/this.js';

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
    // $antdvStyleCache
    bean.defineProperty(beanInstance, '$antdvStyleCache', {
      enumerable: false,
      configurable: true,
      get() {
        return self.serviceSsr.styleCache;
      },
    });
  }
}
