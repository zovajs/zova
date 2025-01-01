import { BeanControllerPageBase, Local, onControllerMounted } from 'zova';
import { ControllerCard } from '../../.metadata/index.js';

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
