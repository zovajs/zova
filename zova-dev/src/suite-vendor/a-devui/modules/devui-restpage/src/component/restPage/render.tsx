import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestPage extends BeanRenderBase {
  public render() {
    // form
    const ComponentRestForm = this.$zovaComponent(this.$$restResource.defaultRestForm);
    const querySdkFindOne = this.$$restResource.getQuerySdkFindOne();
    const schemaFormCreate = this.$$restResource.getSchemaOfFormCreate(querySdkFindOne.data?.operationObject);
    // table
    const ComponentRestTable = this.$zovaComponent(this.$$restResource.defaultRestTable);
    const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
    const schemaTableRow = this.$$restResource.getSchemaOfTableRow(querySdkBootstrap.data?.operationObject);
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    return (
      <div>
        <ClientOnly><ComponentRestForm schema={schemaFormCreate}></ComponentRestForm></ClientOnly>
        <ComponentRestTable
          data={queryDataFindAll.data}
          schema={schemaTableRow}
          onOperationCreate={() => this.onOperationCreate()}
        ></ComponentRestTable>
      </div>
    );
  }
}
