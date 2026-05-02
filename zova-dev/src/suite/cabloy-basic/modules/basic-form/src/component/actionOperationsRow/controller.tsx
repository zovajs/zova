import type { IJsxRenderContextPageEntry } from 'zova-module-basic-restpage';

import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IResourceActionRowPresetOptionsBase } from 'zova-module-a-openapi';

export interface ControllerActionOperationsRowProps extends IResourceActionRowPresetOptionsBase {}

@Controller()
export class ControllerActionOperationsRow extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry;

  protected async __init__() {}

  protected render() {
    return null;
  }
}
