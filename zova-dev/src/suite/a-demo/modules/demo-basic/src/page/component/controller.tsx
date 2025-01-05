import { BeanControllerPageBase, onControllerMounted } from 'zova';
import { Local } from 'zova-module-a-bean';
import { ControllerCard } from '../../.metadata/index.jsx';

@Local()
export class ControllerPageComponent extends BeanControllerPageBase {
  resetTime: Date = new Date();
  cardRef?: ControllerCard;
  inputRef?: HTMLInputElement;

  protected async __init__() {
    onControllerMounted(() => {
      // this.inputRef?.focus();
    });
  }
}
