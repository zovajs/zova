import { BeanControllerBase, PropsBase, RequiredSome } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { VNode } from 'vue';

export interface Props extends PropsBase<ControllerCard, Slots> {
  header?: string;
  content?: string;
  footer?: string;
}

export type Emits = {
  (e: 'reset', time: Date): void;
};

export interface Slots {
  header?(): VNode;
  default?(): VNode;
  footer?(): VNode;
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
