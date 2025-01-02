import { BeanStyleBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerPageRouteQuery } from './controller.js';

export interface StyleRouteQuery extends ControllerPageRouteQuery {}

@Local()
export class StyleRouteQuery extends BeanStyleBase {
  protected async __init__() {}
}
