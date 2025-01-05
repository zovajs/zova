import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ScopeModule } from '../../.metadata/this.js';

@Controller()
export class ControllerPageIndex extends BeanControllerPageBase<ScopeModule> {
  protected async __init__() {}
}
