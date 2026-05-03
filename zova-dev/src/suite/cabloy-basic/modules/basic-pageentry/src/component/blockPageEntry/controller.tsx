import { IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import {
  type IJsxRenderContextPage,
  type IResourceBlockPresetOptionsBase,
  type IJsxRenderContextPageEntry,
  BeanControllerBlockBase,
} from 'zova-module-a-openapi';

export interface ControllerBlockPageEntryProps extends IResourceBlockPresetOptionsBase {}

@Controller()
export class ControllerBlockPageEntry extends BeanControllerBlockBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPageEntry | IJsxRenderContextPage;

  protected async __init__() {}

  protected render() {
    console.log(this.$$renderContext);
    return <div>ssss</div>;
  }
}
