import { BeanControllerBase, Local, PropsBase, RequiredSome } from 'zova';

interface Props extends PropsBase<ControllerEssentialLink, Slots> {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: { name?: string } | string;
}

type Emits = {};

interface Slots {}

@Local()
export class ControllerEssentialLink extends BeanControllerBase {
  static $propsDefault = {
    caption: '',
    icon: '',
  };
}

export interface ControllerEssentialLink {
  $props: RequiredSome<Props, keyof typeof ControllerEssentialLink.$propsDefault>;
  $emit: Emits;
  $slots: Slots;
}

export namespace ControllerEssentialLink {
  export type PropsInput = Props;
}
