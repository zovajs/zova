import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageItem } from './controller.js';

export interface StyleItem extends ControllerPageItem {}

@Local()
export class StyleItem extends BeanStyleBase {
  protected async __init__() {}
}
