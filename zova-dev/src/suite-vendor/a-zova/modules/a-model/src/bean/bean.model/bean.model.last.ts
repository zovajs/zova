import type { ScopeModule } from '../../.metadata/this.js';
import type { BeanModelBase } from '../bean.modelBase.js';
import { BeanBase, cast } from 'zova';
import { __ThisModule__ } from '../../.metadata/this.js';

export class BeanModelLast extends BeanBase {
  get self() {
    return cast<BeanModelBase>(this);
  }

  get scopeSelf(): ScopeModule {
    return this.bean.scope(__ThisModule__);
  }
}
