import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperTable extends BeanRenderBase {
  public render() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$restResource.componentTable);
    const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
    const schemaTableRow = this.$$restResource.getSchemaOfTableRow(querySdkBootstrap.data?.operationObject);
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    return (
      <ComponentTable
        data={queryDataFindAll.data}
        schema={schemaTableRow}
        onOperationCreate={() => this.onOperationCreate()}
      ></ComponentTable>
    );
  }
}
