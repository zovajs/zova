import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZRestTable } from 'zova-module-devui-resttable';

@Render()
export class RenderWrapperTable extends BeanRenderBase {
  public render() {
    // table
    const ComponentRestTable: typeof ZRestTable = this.$zovaComponent(this.$$restResource.componentRestTable);
    const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
    const schemaTableRow = this.$$restResource.getSchemaOfTableRow(querySdkBootstrap.data?.operationObject);
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    return (
      <ComponentRestTable
        data={queryDataFindAll.data}
        schema={schemaTableRow}
        onOperationCreate={() => this.onOperationCreate()}
      ></ComponentRestTable>
    );
  }
}
