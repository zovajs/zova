import { BeanControllerBase, Local } from 'zova';

export interface ControllerLayoutEmptyProps {}

export type ControllerLayoutEmptyEmits = {};

export interface ControllerLayoutEmptySlots {}

@Local()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};
}
