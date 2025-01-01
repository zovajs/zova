import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageTodo } from './controller.js';

export interface StyleTodo extends ControllerPageTodo {}

@Local()
export class StyleTodo extends BeanStyleBase {
  protected async __init__() {}
}
