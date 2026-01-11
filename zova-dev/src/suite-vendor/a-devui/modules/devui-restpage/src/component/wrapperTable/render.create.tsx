import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderCreate extends BeanRenderBase {
  public render() {
    if (!this.$$modelResource.permissions?.table?.create) return;
    return (
      <button
        class="btn btn-primary"
        type="button"
        onClick={() => {
          this.onActionTable('create');
        }}
      >
        {this.scope.locale.Create()}
      </button>
    );
  }
}
