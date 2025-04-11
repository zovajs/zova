import type { ZovaApplication } from '../core/app/index.js';
import type { ZovaContext } from '../core/context/index.js';
import type { ZovaSys } from '../core/sys/sys.js';
import type { ContainerType } from '../decorator/type/containerScope.js';

export class BeanSimple {
  protected sys: ZovaSys;
  protected app: ZovaApplication;
  protected ctx: ZovaContext;

  protected get bean() {
    return this.ctx ? this.ctx.bean : this.sys.bean;
  }

  protected get containerType(): ContainerType {
    if (!this.ctx) return 'sys';
    if (this.ctx.bean === this.app.bean) return 'app';
    return 'ctx';
  }
}
