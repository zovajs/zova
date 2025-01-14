import { BeanControllerBase, PropsBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { VNode } from 'vue';

export interface Props extends PropsBase<ControllerPage, Slots> {}

export type Emits = {};

export interface Slots {
  default?(): VNode;
}

@Controller()
export class ControllerPage extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}
