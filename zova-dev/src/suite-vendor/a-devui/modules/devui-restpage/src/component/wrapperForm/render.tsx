import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperForm extends BeanRenderBase {
  public render() {
    const ComponentForm = this.$zovaComponent(this.$$beanResource.componentForm);
    return (
      <ComponentForm
        controllerRef={ref => { this.$props?.onControllerForm?.(ref); }}
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

    );
  }
}
