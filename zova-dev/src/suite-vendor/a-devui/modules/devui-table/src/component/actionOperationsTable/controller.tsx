import type { IJsxRenderContextPage } from 'zova-module-rest-resource';
import { BeanControllerBase, Use } from 'zova';
import { $performAction } from 'zova-module-a-action';
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
    if (!this.permissions?.table?.create) return;
    const { $jsx, $celScope } = this.$$renderContext;
    return (
      <button
        class="btn btn-primary"
        type="button"
        onClick={() => {
          const actionName = $jsx.normalizeAction('actionCreate');
          $performAction(actionName, { resource: $celScope.resource }, this.$$renderContext);
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
