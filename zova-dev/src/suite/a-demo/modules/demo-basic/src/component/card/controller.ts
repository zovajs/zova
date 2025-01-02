import { BeanControllerBase, Local, RequiredSome } from 'zova';
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

@Local()
export class ControllerCard extends BeanControllerBase {
  static $propsDefault = {
    header: 'default header',
  };
}

export interface ControllerCardProps {
  controllerRef?: (ref: ControllerCard) => void;
  slots?: ControllerCardSlots;
}

export interface ControllerCard {
  $props: RequiredSome<ControllerCardProps, keyof typeof ControllerCard.$propsDefault>;
  $emit: ControllerCardEmits;
  $slots: ControllerCardSlots;
}

export namespace ControllerCard {
  export type PropsInput = ControllerCardProps;
}
