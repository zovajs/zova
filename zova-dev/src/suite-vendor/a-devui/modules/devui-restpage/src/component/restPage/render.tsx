import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestPage<TData extends {} = {}> extends BeanRenderBase {
  private _renderTable() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$modelResource.componentTable);
    return (
      <ComponentTable<TData>
        data={this.data}
        schema={this.schema}
        tableProvider={this.tableProvider}
        tableScope={this.tableScope}
        getColumns={(next, $$table) => {
          return this.getColumns(next, $$table);
        }}
      ></ComponentTable>
    );
  }

  public render() {
    return (
      <div>
        {this._renderTable()}
      </div>
    );
  }
}
