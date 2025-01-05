import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { JSX } from 'vue/jsx-runtime';

export interface ControllerPageProps {}

export type ControllerPageEmits = {};

export interface ControllerPageSlots {
  default?(): JSX.Element;
}

@Controller()
export class ControllerPage extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}
