import type { IJsxRenderContextPage, IResourceActionBulkPresetOptionsBase } from 'zova-module-a-openapi';

import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { VNode } from 'vue';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

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
    const actions = this.$props.preset?.ActionOperationsBulk?.actions;
    if (!actions || actions.length === 0) return;
    const domActions: VNode[] = [];
    actions.forEach((action, index) => {
      const actionName = action.name;
      const actionNameCapitalize = `Action${toUpperCaseFirstChar(actionName)}`;
      const permissionHint = action.options?.preset?.[actionNameCapitalize]?.permission;
      if (!this.$passport.checkPermission(this.permissions, actionName, permissionHint)) return;
      const options = Object.assign({ key: index }, action.options);
      const domAction = $jsx.render(action.render!, options, $celScope, this.$$renderContext);
      if (!domAction) return;
      if (Array.isArray(domAction)) {
        domActions.push(...domAction);
      } else {
        domActions.push(domAction);
      }
    });
    return (
      <div class={this.$props.preset?.ActionOperationsBulk?.class}>
        <div class="join">{domActions}</div>
      </div>
    );
  }
}
