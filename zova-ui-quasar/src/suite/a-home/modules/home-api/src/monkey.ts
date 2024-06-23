import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from 'zova';
import axios from 'axios';
import { BeanApiLike } from './bean/bean.api.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(bean: BeanContainerLike) {
    this.app.meta.$axios = axios;
    this.app.meta.$api = (await bean._getBean('home-api.bean.api', false)) as BeanApiLike;
  }
  async appInitialized(_bean: BeanContainerLike) {}
  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$api', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.meta.$api;
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
