import { BeanControllerBase, Local, PropsBase, RequiredSome } from 'zova';
import { JSX } from 'vue/jsx-runtime';

interface Props extends PropsBase<ControllerPage, Slots> {}

type Emits = {};

interface Slots {
  default?(): JSX.Element;
}

export interface ControllerPage {
  $props: RequiredSome<Props, keyof typeof ControllerPage.$propsDefault>;
  $emit: Emits;
  $slots: Slots;
}

@Local()
export class ControllerPage extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}
