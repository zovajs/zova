import { BeanControllerBase, Local, PropsBase, RequiredSome } from 'zova';
import { JSX } from 'vue/jsx-runtime';

interface Props extends PropsBase {}

interface Props {
  controllerRef?: (ref: ControllerPage) => void;
  'v-slots'?: Slots;
}

type Emits = {};

interface Slots {
  default?(): JSX.Element;
}

@Local()
export class ControllerPage extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}

export interface ControllerPage {
  $props: RequiredSome<Props, keyof typeof ControllerPage.$propsDefault>;
  $emit: Emits;
  $slots: Slots;
}

export namespace ControllerPage {
  export type PropsInput = Props;
}
