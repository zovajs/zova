import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperFilter extends BeanRenderBase {
  public render() {
    const ComponentForm = this.$zovaComponent(this.$$restResource.componentForm);
    return (
      <>
        <ComponentForm
          controllerRef={ref => { this.controllerForm = ref; }}
          inline={true}
          data={this.$props.formData}
          schema={this.schema}
          formMeta={this.formMeta}
          formFieldLayout={this.formFieldLayout}
          formProvider={this.$props.formProvider}
          onSubmit={data => this.onSubmit(data)}
        ></ComponentForm>
        <button
          class="btn btn-primary"
          onClick={() => {
            this.controllerForm.submit();
          }}
        >
          {this.scope.locale.Search()}
        </button>
        <button
          class="btn"
          onClick={() => {
            const data = this.controllerForm.reset();
            this.onReset(data);
          }}
        >
          {this.scope.locale.Reset()}
        </button>
      </>
    );
  }
}
