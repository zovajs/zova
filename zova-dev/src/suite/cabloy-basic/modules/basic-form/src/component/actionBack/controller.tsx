import type { IJsxRenderContextPageEntry, IResourceActionRowPresetOptionsBase } from 'zova-module-a-openapi';

import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerActionBackProps extends IResourceActionRowPresetOptionsBase {}

@Controller()
export class ControllerActionBack extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry;

  protected async __init__() {}

  protected render() {
    return <div>Back</div>;
  }
}
