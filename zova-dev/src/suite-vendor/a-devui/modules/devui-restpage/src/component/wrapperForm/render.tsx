import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperForm extends BeanRenderBase {
  public render() {
    // form
    const ComponentRestForm = this.$zovaComponent(this.$$restResource.defaultRestForm);
    const querySdkFindOne = this.$$restResource.getQuerySdkFindOne();
    const schemaFormCreate = this.$$restResource.getSchemaOfFormCreate(querySdkFindOne.data?.operationObject);
    return (
      <dialog id={this.formId} class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4"><ComponentRestForm schema={schemaFormCreate}></ComponentRestForm></p>
          <div class="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
}
