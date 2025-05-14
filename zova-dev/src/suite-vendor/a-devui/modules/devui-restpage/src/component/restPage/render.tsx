import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZWrapperTable } from '../../.metadata/index.js';

@Render()
export class RenderRestPage extends BeanRenderBase {
  public render() {
    // form
    const ComponentRestForm = this.$zovaComponent(this.$$restResource.defaultRestForm);
    const querySdkFindOne = this.$$restResource.getQuerySdkFindOne();
    const schemaFormCreate = this.$$restResource.getSchemaOfFormCreate(querySdkFindOne.data?.operationObject);

    return (
      <div>
        <ClientOnly><ComponentRestForm schema={schemaFormCreate}></ComponentRestForm></ClientOnly>
        <ZWrapperTable onOperationCreate={() => this.onOperationCreate()}></ZWrapperTable>
      </div>
    );
  }
}
