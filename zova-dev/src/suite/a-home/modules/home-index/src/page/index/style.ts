import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageIndex } from './controller.js';

export interface StyleIndex extends ControllerPageIndex {}

@Local()
export class StyleIndex extends BeanStyleBase {
  protected async __init__() {}
}
