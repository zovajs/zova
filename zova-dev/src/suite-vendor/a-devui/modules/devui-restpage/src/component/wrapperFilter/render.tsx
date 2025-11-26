import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperFilter extends BeanRenderBase {
  public render() {
    const ComponentForm = this.$zovaComponent(this.$$restResource.componentForm);
    return (
      <ComponentForm
        controllerRef={ref => { this.controllerForm = ref; }}
        data={this.$props.formData}
        schema={this.schema}
        formMeta={this.formMeta}
        formProvider={this.$props.formProvider}
        onSubmit={data => this.onSubmit(data)}
      ></ComponentForm>
    );
  }
}
