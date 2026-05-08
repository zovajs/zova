import type { IJsxRenderContextPage } from 'zova-module-a-openapi';

import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IResourceActionBulkOptionsCreate } from 'zova-module-basic-openapi';

export interface ControllerActionCreateProps extends IResourceActionBulkOptionsCreate {}

@Controller()
export class ControllerActionCreate extends BeanControllerBase {
  static $propsDefault = { class: 'btn btn-primary join-item' };
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  protected async __init__() {}

  protected render() {
    return (
      <button
        class={this.$props.class}
        type="button"
        onClick={async () => {
          await this.$performAction('basic-actions:create', this.$props, this.$$renderContext);
        }}
      >
        {this.scope.locale.Create()}
      </button>
    );
  }
}
