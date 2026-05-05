import type { IJsxRenderContextPage } from 'zova-module-a-openapi';

import { classes } from 'typestyle';
import { VNode } from 'vue';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IResourceBlockOptionsToolbarBulk } from 'zova-module-basic-openapi';

export interface ControllerBlockToolbarBulkProps extends IResourceBlockOptionsToolbarBulk {}

@Controller()
export class ControllerBlockToolbarBulk extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  protected async __init__() {}

  get permissions() {
    return this.$$renderContext.$celScope.permissions;
  }

  protected render() {
    const domActions = this._renderActions();
    if (!domActions || domActions.length === 0) return;
    return (
      <div class={classes(this.$props.class, this.$style(this.$props.style))}>
        <div class="join">{domActions}</div>
      </div>
    );
  }

  private _renderActions() {
    const { $jsx, $celScope } = this.$$renderContext;
    const actions = this.$props.actions;
    if (!actions || actions.length === 0) return;
    const domActions: VNode[] = [];
    actions.forEach((action, index) => {
      const actionName = action.name;
      const permissionHint = action.options?.permission;
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
    return domActions;
  }
}
