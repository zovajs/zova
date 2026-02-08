import { BeanControllerBase, PropsBase, RequiredSome } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface Props extends PropsBase<ControllerLayoutEmpty, Slots> {}

export type Emits = {};

export interface Slots {}

@Controller()
export class ControllerLayoutEmpty extends BeanControllerBase<
  unknown,
  RequiredSome<Props, keyof typeof ControllerLayoutEmpty.$propsDefault>,
  Emits,
  Slots
> {
  static $propsDefault = {};
}
