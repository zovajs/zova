import { BeanStyleBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerPageTodo } from './controller.js';

export interface StyleTodo extends ControllerPageTodo {}

@Local()
export class StyleTodo extends BeanStyleBase {
  protected async __init__() {}
}
