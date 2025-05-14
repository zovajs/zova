import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperForm extends BeanRenderBase {
  public render() {
    // form
    const ComponentRestForm = this.$zovaComponent(this.$$restResource.defaultRestForm);
    return (
      <div>
        <input type="checkbox" value={this.modelFormVisible} class="modal-toggle" />
        <dialog id={this.formDomId} class="modal" open={this.modelFormVisible} onClose={() => { this.modelFormVisible = false; }}>
          <div class="modal-box">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">
              {this.modelFormVisible && (
                <ComponentRestForm
                  data={this.formData}
                  schema={this.schema}
                  formMeta={this.$props.formMeta}
                ></ComponentRestForm>
              )}
            </p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
  }
}
