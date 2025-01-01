import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageLogin } from './controller.js';

export interface StyleLogin extends ControllerPageLogin {}

@Local()
export class StyleLogin extends BeanStyleBase {
  protected async __init__() {}
}
