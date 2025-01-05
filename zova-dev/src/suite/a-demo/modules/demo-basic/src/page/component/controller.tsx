import { BeanControllerPageBase, onControllerMounted } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerCard } from '../../.metadata/index.jsx';

@Controller()
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
