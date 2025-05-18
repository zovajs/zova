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
              this.onActionCreate();
            }}
          >
            {this.scope.locale.Create()}
          </button>
        </div>
        <ComponentTable
          columns={this.columns}
          data={this.data}
          schema={this.schema}
        ></ComponentTable>
      </div>
    );
  }
}
