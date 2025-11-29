import { classes } from 'typestyle';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperForm extends BeanRenderBase {
  public render() {
    const ComponentForm = this.$zovaComponent(this.$$restResource.componentForm);
    return (
      <div>
        <dialog id={this.formDomId} class="modal" open={this.modelFormVisible} onClose={() => { this.modelFormVisible = false; }}>
          <div class="modal-box">
            <h3 class="font-bold text-lg">{this.formSchema?.title}</h3>
            <p class="py-4">
              {this.modelFormVisible && (
                <ComponentForm
                  controllerRef={ref => { this.controllerForm = ref; }}
                  data={this.formData}
                  schema={this.formSchema}
                  formMeta={this.formMeta}
                  formProvider={this.$props.formProvider}
                  onSubmit={data => this.onSubmit(data)}
                  onShowError={({ error }) => {
                    // eslint-disable-next-line no-alert
                    window.alert(error.message);
                  }}
                ></ComponentForm>
              )}
            </p>
            <div class="modal-action">
              {this.controllerForm?.form.state.isSubmitting && <span class="loading loading-spinner text-primary"></span>}
              {this.formMeta.formMode === 'edit' && (
                <button
                  class={classes('btn btn-primary', this.controllerForm?.form.state.isSubmitting && 'btn-disabled')}
                  onClick={async () => {
                    await this.controllerForm.submit();
                    this.modelFormVisible = false;
                  }}
                >
                  {this.scope.locale.Submit()}
                </button>
              )}
              <button
                class="btn"
                onClick={() => {
                  this.modelFormVisible = false;
                }}
              >
                {this.scope.locale.Close()}
              </button>
            </div>
          </div>
        </dialog>
      </div>
    );
  }
}
