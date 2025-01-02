import { BeanStyleBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerPageRouteParams } from './controller.js';

export interface StyleRouteParams extends ControllerPageRouteParams {}

@Local()
export class StyleRouteParams extends BeanStyleBase {
  protected async __init__() {}
}
