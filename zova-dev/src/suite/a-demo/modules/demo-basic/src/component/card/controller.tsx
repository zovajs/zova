import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { JSX } from 'vue/jsx-runtime';

export interface ControllerCardProps {
  header?: string;
  content?: string;
  footer?: string;
}

export type ControllerCardEmits = {
  (e: 'reset', time: Date): void;
};

export interface ControllerCardSlots {
  header?(): JSX.Element;
  default?(): JSX.Element;
  footer?(): JSX.Element;
}

@Controller()
export class ControllerCard extends BeanControllerBase {
  static $propsDefault = {
    header: 'default header',
  };
}
