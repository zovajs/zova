import { BeanControllerBase } from 'zova';
import { Local } from 'zova-module-a-bean';

export interface ControllerLayoutEmptyProps {}

export type ControllerLayoutEmptyEmits = {};

export interface ControllerLayoutEmptySlots {}

@Local()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};
}
