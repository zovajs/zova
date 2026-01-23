import type { ControllerPageEntry, ModelResource } from 'zova-module-rest-resource';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, TypeFormOnSubmitData } from 'zova-module-a-form';

export interface ControllerWrapperFormProps {
  onControllerForm?: (ref: ControllerForm) => void;
}

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'host' })
  $$restPageEntry: ControllerPageEntry;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  protected async __init__() {}

  async onSubmit(data: TypeFormOnSubmitData) {
    const { formMeta, entryId } = this.$$restPageEntry;
    const mutationSubmit = this.$$modelResource.getFormMutationSubmit(formMeta, entryId);
    await mutationSubmit?.mutateAsync(data.value as any);
  }

  protected render() {
    const { formData, formSchema, formMeta, formProvider, formScope } = this.$$restPageEntry;
    const ComponentForm = this.$zovaComponent(this.$$modelResource.componentForm);
    return (
      <ComponentForm
        controllerRef={ref => { this.$props?.onControllerForm?.(ref); }}
        data={formData}
        schema={formSchema}
        formMeta={formMeta}
        formProvider={formProvider}
        formScope={formScope}
        onSubmit={data => this.onSubmit(data)}
        onShowError={({ error }) => {
          // eslint-disable-next-line no-alert
          window.alert(error.message);
        }}
      ></ComponentForm>
    );
  }
}
