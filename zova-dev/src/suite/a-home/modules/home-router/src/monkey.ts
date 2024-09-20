import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { LocalRouter } from './bean/local.router.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  localRouter: LocalRouter;

  async appInitialize(_bean: BeanContainer) {
    // router
    this.localRouter = await this.bean._newBean(LocalRouter, false);
  }
  async appInitialized(_bean: BeanContainer) {}
  async appReady(_bean: BeanContainer) {}

  async beanInit(_bean: BeanContainer, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
