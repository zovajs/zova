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

export interface ControllerEssentialLink {
  $props: RequiredSome<Props, keyof typeof ControllerEssentialLink.$propsDefault>;
  $emits: Emits;
  $slots: Slots;
}

@Local()
export class ControllerEssentialLink extends BeanControllerBase {
  static $propsDefault = {
    caption: '',
    icon: '',
  };
}
