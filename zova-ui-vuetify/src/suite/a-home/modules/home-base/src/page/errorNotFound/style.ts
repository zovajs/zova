import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';
import type { ControllerPageErrorNotFound } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

@Style()
export class StylePageErrorNotFound extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
