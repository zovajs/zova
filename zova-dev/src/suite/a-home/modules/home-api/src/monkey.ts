import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { BeanApi } from './bean/bean.api.js';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  async appInitialize() {
    // api
    this.app.meta.$api = (await this.bean._getBean('home-api.bean.api', false)) as BeanApi;
  }
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    // $api
    bean.defineProperty(beanInstance, '$api', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.meta.$api;
      },
    });
    // $service
    bean.defineProperty(beanInstance, '$service', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.bean.scope(__ThisModule__).service;
      },
    });
  }
}
