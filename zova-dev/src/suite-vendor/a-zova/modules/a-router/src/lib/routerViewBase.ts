import { BeanControllerBase } from 'zova';
import { routerViewKey } from './const.js';

export class BeanRouterViewBase extends BeanControllerBase {
  protected async __init__() {
    this.bean._setBean(routerViewKey, this);
  }
}
