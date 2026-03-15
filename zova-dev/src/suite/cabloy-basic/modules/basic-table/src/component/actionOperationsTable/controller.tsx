import type { IJsxRenderContextPage } from 'zova-module-basic-restpage';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerActionOperationsTable extends BeanControllerBase {
  protected async __init__() {}

  @Use({ injectionScope: 'host' })
  $$renderContext: IJsxRenderContextPage;

  get permissions() {
    return this.$$renderContext.$celScope.permissions;
  }

  private _renderCreate() {
    const permissionCreate = this.$passport.checkPermission(this.permissions, 'create');
    if (!permissionCreate) return;
    const { $jsx } = this.$$renderContext;
    return (
      <button
        class="btn btn-primary"
        type="button"
        onClick={() => {
          const actionName = $jsx.normalizeAction('actionCreate');
          this.$performAction(actionName, undefined, this.$$renderContext);
        }}
      >
        {this.scope.locale.Create()}
      </button>
    );
  }

  protected render() {
    return (
      <div>
        {this._renderCreate()}
      </div>
    );
  }
}
