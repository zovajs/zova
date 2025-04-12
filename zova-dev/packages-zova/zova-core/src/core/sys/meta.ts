import type { RouteRecordRaw } from 'vue-router';
import type { Constructable } from '../../decorator/type/constructable.js';
import type { IMonkeyModule, IMonkeySys } from '../../types/interface/monkey.js';
import { BeanSimple } from '../../bean/beanSimple.js';
import { SysComponent } from './component.js';
import { SysError } from './error.js';
import { SysLocale } from './locale.js';
import { SysModule } from './module.js';

export class SysMeta extends BeanSimple {
  module: SysModule;
  component: SysComponent;
  locale: SysLocale;
  error: SysError;

  /** @internal */
  public sysMonkey?: IMonkeyModule & IMonkeySys;

  /** @internal */
  public legacyRoutes?: RouteRecordRaw[];

  protected __init__() {
    this.module = this.bean._newBeanSimple(SysModule, false);
    this.component = this.bean._newBeanSimple(SysComponent, false);
    this.locale = this.bean._newBeanSimple(SysLocale, false);
    this.error = this.bean._newBeanSimple(SysError, false);
  }

  /** @internal */
  public async initialize(SysMonkey?: Constructable<IMonkeyModule & IMonkeySys>, legacyRoutes?: RouteRecordRaw[]) {
    if (SysMonkey) {
      this.sysMonkey = this.bean._newBeanSimple(SysMonkey, false);
    }
    this.legacyRoutes = legacyRoutes;
  }
}
