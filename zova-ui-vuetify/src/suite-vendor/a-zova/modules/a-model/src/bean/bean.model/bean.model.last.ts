import type { ScopeModule } from '../../.metadata/this.js';
import type { IDecoratorModelOptions } from '../../types/model.js';
import type { BeanModelBase } from '../bean.modelBase.js';
import { BeanBase, cast } from 'zova';
import { __ThisModule__ } from '../../.metadata/this.js';

export class BeanModelLast extends BeanBase {
  public selector: string;

  protected async __init__(selector?: unknown) {
    if (this.$onionOptions?.enableSelector) {
      this.selector = selector as string ?? '';
    }
  }

  public get $onionOptions(): IDecoratorModelOptions | undefined {
    return super.$onionOptions as IDecoratorModelOptions | undefined;
  }

  get self() {
    return cast<BeanModelBase>(this);
  }

  get scopeSelf(): ScopeModule {
    return this.bean.scope(__ThisModule__);
  }
}
