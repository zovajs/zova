import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperForm extends BeanRenderBase {
  public render() {
    // form
    const ComponentRestForm = this.$zovaComponent(this.$$restResource.defaultRestForm);
    const querySdkFindOne = this.$$restResource.getQuerySdkFindOne();
    const schemaFormCreate = this.$$restResource.getSchemaOfFormCreate(querySdkFindOne.data?.operationObject);
    return <ComponentRestForm schema={schemaFormCreate}></ComponentRestForm>;
  }
}
