import { BeanControllerBase, Local } from 'zova';
import { JSX } from 'vue/jsx-runtime';

export interface ControllerPageProps {}

export type ControllerPageEmits = {};

export interface ControllerPageSlots {
  default?(): JSX.Element;
}

@Local()
export class ControllerPage extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}
