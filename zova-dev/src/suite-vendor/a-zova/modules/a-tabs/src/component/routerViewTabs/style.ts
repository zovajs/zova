import { BeanStyleBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerRouterViewTabs } from './controller.js';

export interface StyleRouterViewTabs extends ControllerRouterViewTabs {}

@Local()
export class StyleRouterViewTabs extends BeanStyleBase {
  protected async __init__() {}
}
