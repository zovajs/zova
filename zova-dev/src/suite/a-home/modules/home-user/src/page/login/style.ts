import { BeanStyleBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerPageLogin } from './controller.js';

export interface StyleLogin extends ControllerPageLogin {}

@Local()
export class StyleLogin extends BeanStyleBase {
  protected async __init__() {}
}
