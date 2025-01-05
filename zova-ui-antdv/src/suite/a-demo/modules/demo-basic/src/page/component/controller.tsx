import { BeanControllerPageBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import { ControllerCard } from '../../.metadata/index.jsx';
import { ScopeModule } from '../../.metadata/this.js';

@Local()
export class ControllerPageComponent extends BeanControllerPageBase<ScopeModule> {
  resetTime: Date = new Date();
  cardRef: ControllerCard;
}
