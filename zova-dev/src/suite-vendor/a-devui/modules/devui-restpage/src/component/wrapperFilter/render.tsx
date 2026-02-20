import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperFilter extends BeanRenderBase {
  public render() {
    const ComponentForm = this.$zovaComponent(this.$$modelResource.componentForm);
    return (
      <ComponentForm
        inline={true}
        data={this.$props.formData}
        schema={this.schema}
        schemaScene="filter"
        formMeta={this.formMeta}
        formFieldLayout={this.formFieldLayout}
        formProvider={this.$props.formProvider}
        onSubmitData={data => this.onSubmit(data)}
        slotFooter={$$form => {
          return (
            <>
              <button
                class="btn btn-primary"
                onClick={() => {
                  $$form.submit();
                }}
              >
                {this.scope.locale.Search()}
              </button>
              <button
                class="btn"
                onClick={() => {
                  const data = $$form.reset();
                  this.onReset(data);
                }}
              >
                {this.scope.locale.Reset()}
              </button>
            </>
          );
        }}
      ></ComponentForm>
    );
  }
}
