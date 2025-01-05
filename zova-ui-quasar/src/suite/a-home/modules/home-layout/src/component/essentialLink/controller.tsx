import { BeanControllerBase, PropsBase, RequiredSome } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface Props extends PropsBase<ControllerEssentialLink, Slots> {
  title?: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
}

export type Emits = {};

export interface Slots {}

@Controller()
export class ControllerEssentialLink extends BeanControllerBase<
  unknown,
  RequiredSome<Props, keyof typeof ControllerEssentialLink.$propsDefault>,
  Emits,
  Slots
> {
  static $propsDefault = {
    caption: '',
    icon: '',
  };
}
