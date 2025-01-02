import { BeanControllerBase, Local, PropsBase, RequiredSome } from 'zova';
import { JSX } from 'vue/jsx-runtime';

export interface Props extends PropsBase {
  header?: string;
  content?: string;
  footer?: string;
}

type Emits = {
  (e: 'reset', time: Date): void;
};

interface Slots {
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

export interface ControllerCard {
  $props: RequiredSome<Props, keyof typeof ControllerCard.$propsDefault>;
  $emit: Emits;
  $slots: Slots;
}

export namespace ControllerCard {
  export type PropsInput = Props;
}
