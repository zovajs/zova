import { BeanControllerBase, Local, RequiredSome } from 'zova';
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

export interface ControllerPage {
  $props: RequiredSome<ControllerPageProps, keyof typeof ControllerPage.$propsDefault>;
  $emit: ControllerPageEmits;
  $slots: ControllerPageSlots;
}

export namespace ControllerPage {
  export type PropsInput = ControllerPageProps;
}
