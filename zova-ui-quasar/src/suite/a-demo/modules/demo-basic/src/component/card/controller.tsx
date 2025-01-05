import { BeanControllerBase, PropsBase, RequiredSome } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { JSX } from 'vue/jsx-runtime';

export interface Props extends PropsBase<ControllerCard, Slots> {
  header?: string;
  content?: string;
  footer?: string;
}

export type Emits = {
  (e: 'reset', time: Date): void;
};

export interface Slots {
  header?(): JSX.Element;
  default?(): JSX.Element;
  footer?(): JSX.Element;
}

@Controller()
export class ControllerCard extends BeanControllerBase<
  unknown,
  RequiredSome<Props, keyof typeof ControllerCard.$propsDefault>,
  Emits,
  Slots
> {
  static $propsDefault = {
    header: 'default header',
  };
}
