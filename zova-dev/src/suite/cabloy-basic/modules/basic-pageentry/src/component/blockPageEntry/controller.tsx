import type { IJsxRenderContextPageEntry, IResourceBlockOptionsPageEntry } from 'zova-module-a-openapi';

import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerBlockPageEntryProps extends IResourceBlockOptionsPageEntry {}

@Controller()
export class ControllerBlockPageEntry extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry;

  protected async __init__() {}

  protected render() {
    console.log(this.$props);
    console.log(this.$style(undefined));
    return null;
  }
}
