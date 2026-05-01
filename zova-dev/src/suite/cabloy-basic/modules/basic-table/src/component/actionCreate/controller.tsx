import type { IJsxRenderContextPage } from 'zova-module-basic-restpage';

import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IResourceActionBulkPresetOptionsBase } from 'zova-module-a-openapi';

export interface ControllerActionCreateProps extends IResourceActionBulkPresetOptionsBase {}

@Controller()
export class ControllerActionCreate extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  protected async __init__() {}

  protected render() {
    const { $jsx } = this.$$renderContext;
    return (
      <button
        class={this.$props.preset?.ActionCreate?.class ?? 'btn  btn-primary join-item'}
        type="button"
        onClick={async () => {
          const actionName = $jsx.normalizeAction('ActionCreate');
          await this.$performAction(actionName, this.$props.preset?.ActionCreate, this.$$renderContext);
        }}
      >
        {this.scope.locale.Create()}
      </button>
    );
  }
}
