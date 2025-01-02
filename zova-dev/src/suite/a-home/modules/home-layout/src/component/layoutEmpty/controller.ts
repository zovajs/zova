import { BeanControllerBase, Local, PropsBase, RequiredSome } from 'zova';

interface Props extends PropsBase {}

interface Props {
  controllerRef?: (ref: ControllerLayoutEmpty) => void;
  'v-slots'?: Slots;
}

type Emits = {};

interface Slots {}

@Local()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};
}

export interface ControllerLayoutEmpty {
  $props: RequiredSome<Props, keyof typeof ControllerLayoutEmpty.$propsDefault>;
  $emit: Emits;
  $slots: Slots;
}

export namespace ControllerLayoutEmpty {
  export type PropsInput = Props;
}
