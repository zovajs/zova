import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestPage extends BeanRenderBase {
  public render() {
    const ComponentRestTable = this.$zovaComponent(this.$$restResource.defaultRestTable);
    const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
    const schema = this.$$restResource.getSchemaOfTableRow(querySdkBootstrap.data?.operationObject);
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    return (
      <div>
        <div>{this.columns}</div>
        <ComponentRestTable data={queryDataFindAll.data} schema={schema}></ComponentRestTable>
      </div>
    );
  }
}
