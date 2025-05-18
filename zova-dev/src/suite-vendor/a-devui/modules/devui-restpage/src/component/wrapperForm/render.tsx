import { classes } from 'typestyle';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperForm extends BeanRenderBase {
  public render() {
    // mutation
    const mutationSubmit = this.$props.getMutationSubmit?.();
    const ComponentForm = this.$zovaComponent(this.$$restResource.componentForm);
    return (
      <div>
        <dialog id={this.formDomId} class="modal" open={this.modelFormVisible} onClose={() => { this.modelFormVisible = false; }}>
          <div class="modal-box">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">
              {this.modelFormVisible && !!this.formData && (
                <ComponentForm
                  controllerRef={ref => { this.controllerRestForm = ref; }}
                  data={this.formData}
                  schema={this.schema}
                  formMeta={this.$props.formMeta}
                  formProvider={this.$props.formProvider}
                  onSubmit={data => this.onSubmit(data)}
                ></ComponentForm>
              )}
            </p>
            <div class="modal-action">
              {mutationSubmit?.isPending && <span class="loading loading-spinner text-primary"></span>}
              <button
                class={classes('btn btn-primary', mutationSubmit?.isPending && 'btn-disabled')}
                onClick={() => {
                  return this.controllerRestForm.submit();
                }}
              >
                {this.scope.locale.Submit()}
              </button>
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
        <dialog class="modal" open={mutationSubmit?.isError} onClose={() => { mutationSubmit?.reset(); }}>
          <div class="modal-box">
            <p class="py-4">
              <div role="alert" class="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{mutationSubmit?.error?.message}</span>
                <div>
                  <button
                    class="btn btn-sm"
                    onClick={() => {
                      mutationSubmit?.reset();
                    }}
                  >
                    {this.scope.locale.Close()}
                  </button>
                </div>
              </div>
            </p>
          </div>
        </dialog>
      </div>
    );
  }
}
