import { BeanControllerBase, Local, PropsBase, RequiredSome } from 'zova';

interface Props extends PropsBase<ControllerLayoutEmpty, Slots> {}

type Emits = {};

interface Slots {}

export interface ControllerLayoutEmpty {
  $props: RequiredSome<Props, keyof typeof ControllerLayoutEmpty.$propsDefault>;
  $emit: Emits;
  $slots: Slots;
}

@Local()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};
}
