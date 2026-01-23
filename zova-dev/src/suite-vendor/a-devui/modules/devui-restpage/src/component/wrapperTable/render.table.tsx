import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderTable<TData extends {} = {}> extends BeanRenderBase {
  public render() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$modelResource.componentTable);
    return (
      <ComponentTable<TData>
        data={this.data}
        schema={this.schema}
        tableProvider={this.$props.tableProvider}
        tableScope={this.$props.tableScope}
        getColumns={(next, $$table) => {
          return this.getColumns(next, $$table);
        }}
      ></ComponentTable>
    );
  }
}
