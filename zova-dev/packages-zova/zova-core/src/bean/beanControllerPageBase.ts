import type { IControllerData } from './type.js';
import { BeanBase } from './beanBase.js';

export class BeanControllerPageBase extends BeanBase {
  public $params: unknown;
  public $query: unknown;

  /** @internal */
  public __initControllerData(controllerData: IControllerData) {
    if (this.app) {
      this.app.meta.module._monkeyModuleSync(true, 'controllerDataInit', undefined, controllerData, this);
    }
  }

  /** @internal */
  public __updateControllerData() {
    this.app.meta.module._monkeyModuleSync(true, 'controllerDataUpdate', undefined, this);
  }
}
