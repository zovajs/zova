import { BeanBase } from './beanBase.js';
import { IControllerData } from './type.js';

export class BeanControllerPageBase extends BeanBase {
  public $params: unknown;
  public $query: unknown;

  /** @internal */
  public __initControllerData(controllerData: IControllerData) {
    if (this.app) {
      this.app.meta.module._monkeyModuleSync('controllerDataInit', undefined, controllerData, this);
    }
  }
}
