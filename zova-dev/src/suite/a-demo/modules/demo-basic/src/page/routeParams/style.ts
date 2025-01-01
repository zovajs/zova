import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageRouteParams } from './controller.js';

export interface StyleRouteParams extends ControllerPageRouteParams {}

@Local()
export class StyleRouteParams extends BeanStyleBase {
  protected async __init__() {}
}
