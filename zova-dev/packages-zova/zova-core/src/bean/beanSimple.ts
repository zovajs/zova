import type { ZovaSys } from 'zova';
import type { ZovaApplication } from '../core/app/index.js';
import type { ZovaContext } from '../core/context/index.js';
import { sys } from 'zova';

export class BeanSimple {
  protected app: ZovaApplication;
  protected ctx: ZovaContext;

  protected get bean() {
    return this.ctx.bean;
  }

  protected get sys(): ZovaSys {
    return sys;
  }
}
