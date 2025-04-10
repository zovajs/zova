import type { ZovaSys } from 'zova';
import type { ZovaApplication } from '../core/app/index.js';
import type { ZovaContext } from '../core/context/index.js';

export class BeanSimple {
  protected sys: ZovaSys;
  protected app: ZovaApplication;
  protected ctx: ZovaContext;

  protected get bean() {
    return this.ctx.bean;
  }
}
