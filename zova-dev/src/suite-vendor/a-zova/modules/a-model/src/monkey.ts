import type { BeanBase, BeanContainer, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { useQueryClient } from '@tanstack/vue-query';
import { markRaw } from 'vue';
import { BeanSimple } from 'zova';
import { ServiceStorage } from './service/storage.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  storage: ServiceStorage;

  async appInitialize() {
    // storage
    this.storage = await this.bean._newBean(ServiceStorage, false);
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$queryClient', {
      enumerable: false,
      configurable: true,
      get() {
        return markRaw(useQueryClient());
      },
    });
  }
}
