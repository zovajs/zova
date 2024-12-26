import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { LocalRouter } from './bean/local.router.js';
import { LocalSSR } from './bean/local.ssr.js';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  localRouter: LocalRouter;
  localSSR: LocalSSR;

  async appInitialize() {
    // router
    this.localRouter = await this.bean._newBean(LocalRouter, false);
    // ssr
    this.localSSR = await this.bean._newBean(LocalSSR, false);
    await this.localSSR.initialize();
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
