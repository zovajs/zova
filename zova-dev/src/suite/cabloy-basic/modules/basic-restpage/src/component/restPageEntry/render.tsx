import { classes } from 'typestyle';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestPageEntry<TData extends {} = {}> extends BeanRenderBase {
  private _renderForm() {
    const ComponentForm = this.$zovaComponent(this.$$modelResource.componentForm);
    return (
      <ComponentForm<TData>
        controllerRef={ref => {
          this.controllerForm = ref;
        }}
        data={this.formData}
        schema={this.formSchema}
        formMeta={this.formMeta}
        formProvider={this.formProvider}
        formScope={this.pageEntryScope}
        onSubmitData={data => this.onSubmit(data)}
        onShowError={({ error }) => {
          // eslint-disable-next-line no-alert
          window.alert(error.message);
        }}
        onChanged={data => {
          this.setPageMeta(data, true);
        }}
      ></ComponentForm>
    );
  }

  private _renderToolbar() {
    return (
      <div>
        {this.controllerForm?.formState.isSubmitting && <span class="loading loading-spinner text-primary"></span>}
        {this.formMeta.formMode === 'edit' && (
          <button
            class={classes('btn btn-primary', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
            onClick={async () => {
              const res = await this.controllerForm.submit();
              if (res) {
                this.$router.back();
              }
            }}
          >
            {this.scope.locale.Submit()}
          </button>
        )}
        <button
          class={classes('btn', this.controllerForm?.formState.isSubmitting && 'btn-disabled')}
          onClick={() => {
            this.$router.back();
          }}
        >
          {this.scope.locale.Back()}
        </button>
      </div>
    );
  }

  public render() {
    const toolbarPosition = this.$props.toolbarPosition;
    const domToolbar = this._renderToolbar();
    if (!this.formData) {
      return <div>{this.scope.locale.EntryNotExist()}</div>;
    }
    return (
      <div>
        {toolbarPosition === 'top' && domToolbar}
        {this._renderForm()}
        {toolbarPosition === 'bottom' && domToolbar}
      </div>
    );
  }
}
