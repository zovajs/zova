import { BeanStyleBase, Local } from 'zova';
import type { ControllerPagePinia } from './controller.js';

export interface StylePinia extends ControllerPagePinia {}

@Local()
export class StylePinia extends BeanStyleBase {
  protected async __init__() {}
}
