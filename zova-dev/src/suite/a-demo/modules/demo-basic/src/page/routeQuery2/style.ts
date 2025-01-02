import { BeanStyleBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerPageRouteQuery2 } from './controller.js';

export interface StyleRouteQuery2 extends ControllerPageRouteQuery2 {}

@Local()
export class StyleRouteQuery2 extends BeanStyleBase {
  protected async __init__() {}
}
