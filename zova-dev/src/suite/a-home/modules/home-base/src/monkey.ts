import type { BeanBase, BeanContainer, IMonkeyAppClose, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { BeanSimple } from 'zova';
import { definePropertyScopeBase } from './lib/utils.js';
import { ServiceRouter } from './service/router.js';
import { ServiceSsr } from './service/ssr.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyAppClose, IMonkeyBeanInit {
  serviceRouter: ServiceRouter;
  serviceSsr: ServiceSsr;

  async appInitialize() {
    // router
    this.serviceRouter = await this.bean._newBean(ServiceRouter, false);
    // ssr
    this.serviceSsr = await this.bean._newBean(ServiceSsr, false);
    await this.serviceSsr.initialize();
  }

  appClose(): void {
    if (this.serviceRouter) {
      this.serviceRouter.dispose();
    }
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    definePropertyScopeBase(bean, beanInstance);
  }
}
