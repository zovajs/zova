import type { RouteRecordRaw } from 'vue-router';
import type { Constructable } from '../../decorator/type/constructable.js';
import type { IMonkeyModule, IMonkeySys } from '../../types/interface/monkey.js';
import { BeanSimple } from '../../bean/beanSimple.js';
import { SysLocale } from './locale.js';
import { SysModule } from './module.js';

export class SysMeta extends BeanSimple {
  module: SysModule;
  locale: SysLocale;

  /** @internal */
  public sysMonkey?: IMonkeyModule & IMonkeySys;

  /** @internal */
  public legacyRoutes?: RouteRecordRaw[];

  protected __init__() {
    this.module = this.app.bean._newBeanSimple(SysModule, false);
    this.locale = this.app.bean._newBeanSimple(SysLocale, false);
  }

  /** @internal */
  public async initialize(SysMonkey?: Constructable<IMonkeyModule & IMonkeySys>, legacyRoutes?: RouteRecordRaw[]) {
    if (SysMonkey) {
      this.sysMonkey = this.bean._newBeanSimple(SysMonkey, false);
    }
    this.legacyRoutes = legacyRoutes;
  }
}
