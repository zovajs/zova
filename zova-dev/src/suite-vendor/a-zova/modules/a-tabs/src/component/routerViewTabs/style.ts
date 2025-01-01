import { BeanStyleBase, Local } from 'zova';
import type { ControllerRouterViewTabs } from './controller.js';

export interface StyleRouterViewTabs extends ControllerRouterViewTabs {}

@Local()
export class StyleRouterViewTabs extends BeanStyleBase {
  protected async __init__() {}
}
