import { JSX } from 'vue/jsx-runtime';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerBehaviorSlots {
  default?: () => JSX.Element;
}

@Controller()
export class ControllerBehavior extends BeanControllerBase {
  protected async __init__() {}

  protected render() {
    return this.$slots.default?.();
  }
}
