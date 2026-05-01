import { BeanControllerBase, IComponentOptions } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IResourceActionBulkOptionsBase } from 'zova-module-a-openapi';

export interface ControllerActionCreateProps extends IResourceActionBulkOptionsBase {}

@Controller()
export class ControllerActionCreate extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  protected async __init__() {}

  protected render() {
    return null;
  }
}
