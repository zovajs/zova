import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperTable extends BeanRenderBase {
  public render() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$restResource.componentTable);
    return (
      <div>
        <div>
          <button
            class="btn btn-primary"
            type="button"
            onClick={() => {
              this.onOperationCreate();
            }}
          >
            {this.scope.locale.Create()}
          </button>
        </div>
        <ComponentTable
          data={this.data}
          schema={this.schema}
        ></ComponentTable>
      </div>
    );
  }
}
