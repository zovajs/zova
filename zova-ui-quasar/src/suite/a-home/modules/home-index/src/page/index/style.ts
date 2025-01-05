import { BeanStyleBase } from 'zova';
import { Style } from 'zova-module-a-bean';
import type { ControllerPageIndex } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

@Style()
export class StylePageIndex extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
