import type { RouteRecordRaw } from 'vue-router';
import { BeanSimple } from '../../bean/beanSimple.js';

export class SysMeta extends BeanSimple {
  /** @internal */
  public legacyRoutes?: RouteRecordRaw[];

  /** @internal */
  public initialize(legacyRoutes?: RouteRecordRaw[]) {
    this.legacyRoutes = legacyRoutes;
  }
}
