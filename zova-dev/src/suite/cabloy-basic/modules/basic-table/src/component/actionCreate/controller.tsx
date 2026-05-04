import type { IJsxRenderContextPage } from 'zova-module-a-openapi';

import { classes } from 'typestyle';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IResourceActionBulkOptionsCreate } from 'zova-module-basic-openapi';

export interface ControllerActionCreateProps extends IResourceActionBulkOptionsCreate {}

@Controller()
export class ControllerActionCreate extends BeanControllerBase {
  static $propsDefault = { class: 'btn  btn-primary join-item' };
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  protected async __init__() {}

  protected render() {
    const { $jsx } = this.$$renderContext;
    return (
      <button
        class={classes(this.$props.class, this.$style(this.$props.style))}
        type="button"
        onClick={async () => {
          const actionName = $jsx.normalizeAction('ActionCreate');
          await this.$performAction(actionName, this.$props, this.$$renderContext);
        }}
      >
        {this.scope.locale.Create()}
      </button>
    );
  }
}
