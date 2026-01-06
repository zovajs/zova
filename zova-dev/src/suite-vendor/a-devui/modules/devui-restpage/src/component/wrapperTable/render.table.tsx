import { Row } from '@tanstack/table-core';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';

@Render()
export class RenderTable<TData extends {} = {}> extends BeanRenderBase {
  public render() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$beanResource.componentTable);
    return (
      <ComponentTable<TData>
        data={this.data}
        schema={this.schema}
        getColumns={(next, $$table) => {
          return this.getColumns(next, $$table);
        }}
        onActionTable={(action: keyof TypeResourceActionTableRecord) => {
          return this.$props.onActionTable?.(action);
        }}
        onActionRow={(action: keyof TypeResourceActionRowRecord, row: Row<TData>) => {
          return this.$props.onActionRow?.(action, row);
        }}
      ></ComponentTable>
    );
  }
}
