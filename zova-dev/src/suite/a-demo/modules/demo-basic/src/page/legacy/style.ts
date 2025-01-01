import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageLegacy } from './controller.js';

export interface StyleLegacy extends ControllerPageLegacy {}

@Local()
export class StyleLegacy extends BeanStyleBase {
  protected async __init__() {}
}
