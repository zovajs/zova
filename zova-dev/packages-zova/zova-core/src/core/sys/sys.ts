import type { ZovaConfig } from '../app/config.js';
import { BeanContainer } from '../../bean/beanContainer.js';
import { SysMeta } from './meta.js';
import { SysUtil } from './util.js';

export class ZovaSys {
  bean: BeanContainer;
  util: SysUtil;
  meta: SysMeta;
  config: ZovaConfig;

  constructor() {
    this.bean = BeanContainer.create(null!, null);
    this.util = this.bean._newBeanSimple(SysUtil, false);
    this.meta = this.bean._newBeanSimple(SysMeta, false);
    this.meta.initialize();
  }
}

export const sys = new ZovaSys();
