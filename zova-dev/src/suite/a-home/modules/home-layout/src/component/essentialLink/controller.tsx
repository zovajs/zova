import { BeanControllerBase } from 'zova';
import { Local } from 'zova-module-a-bean';

export interface ControllerEssentialLinkProps {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: { name?: string } | string;
}

export type ControllerEssentialLinkEmits = {};

export interface ControllerEssentialLinkSlots {}

@Local()
export class ControllerEssentialLink extends BeanControllerBase {
  static $propsDefault = {
    caption: '',
    icon: '',
  };
}
