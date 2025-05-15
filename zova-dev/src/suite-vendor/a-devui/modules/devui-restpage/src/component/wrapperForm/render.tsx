import { classes } from 'typestyle';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperForm extends BeanRenderBase {
  public render() {
    // form
    const ComponentRestForm = this.$zovaComponent(this.$$restResource.componentRestForm);
    return (
      <dialog id={this.formDomId} class="modal" open={this.modelFormVisible} onClose={() => { this.modelFormVisible = false; }}>
        <div class="modal-box">
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">
            {this.modelFormVisible && !!this.formData && (
              <ComponentRestForm
                controllerRef={ref => { this.controllerRestForm = ref; }}
                data={this.formData}
                schema={this.schema}
                formMeta={this.$props.formMeta}
                formBehaviors={this.$props.formBehaviors}
                onSubmit={data => this.onSubmit(data)}
              ></ComponentRestForm>
            )}
          </p>
          <div class="modal-action">
            {this.loading && <span class="loading loading-spinner text-primary"></span>}
            <button
              class={classes('btn btn-primary', this.loading && 'btn-disabled')}
              onClick={() => {
                return this.controllerRestForm.submit();
              }}
            >
              {this.scope.locale.Submit()}
            </button>
            <form method="dialog">
              <button class="btn">{this.scope.locale.Close()}</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
}
