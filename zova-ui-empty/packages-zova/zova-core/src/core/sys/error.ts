import type { TypeModuleResourceErrorModules } from '../../types/interface/module.js';

import { BeanSimple } from '../../bean/beanSimple.js';

export class SysError extends BeanSimple {
  /** @internal */
  public errors: TypeModuleResourceErrorModules;

  /** @internal */
  public async initialize() {
    this.errors = {};
  }
}
