import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { ServiceRouter } from './bean/service.router.js';
import { ServiceSSR } from './bean/service.ssr.js';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  serviceRouter: ServiceRouter;
  serviceSSR: ServiceSSR;

  async appInitialize() {
    // router
    this.serviceRouter = await this.bean._newBean(ServiceRouter, false);
    // ssr
    this.serviceSSR = await this.bean._newBean(ServiceSSR, false);
    await this.serviceSSR.initialize();
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
