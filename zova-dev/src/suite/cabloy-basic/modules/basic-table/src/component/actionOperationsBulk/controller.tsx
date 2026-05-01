import type { IJsxRenderContextPage } from 'zova-module-basic-restpage';

import { VNode } from 'vue';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IResourceActionBulkPresetOptionsBase } from 'zova-module-a-openapi';

export interface ControllerActionOperationsBulkProps extends IResourceActionBulkPresetOptionsBase {}

@Controller()
export class ControllerActionOperationsBulk extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  protected async __init__() {}

  get permissions() {
    return this.$$renderContext.$celScope.permissions;
  }

  protected render() {
    const { $jsx, $celScope } = this.$$renderContext;
    const actions = this.$props.preset?.actionOperationsBulk?.actions;
    if (!actions || actions.length === 0) return;
    const domActions: VNode[] = [];
    for (const action of actions) {
      const actionName = action.name;
      if (!this.$passport.checkPermission(this.permissions, actionName)) continue;
      const options = Object.assign({ key: actionName }, action.options);
      const domAction = $jsx.render(options.render!, options, $celScope, this.$$renderContext);
      if (!domAction) continue;
      if (Array.isArray(domAction)) {
        domActions.push(...domAction);
      } else {
        domActions.push(domAction);
      }
    }
    return <div class="join">{domActions}</div>;
  }
}
