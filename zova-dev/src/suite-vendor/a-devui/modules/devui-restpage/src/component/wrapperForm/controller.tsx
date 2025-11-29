import type { ControllerPageResource } from 'zova-module-rest-resource';
import { SchemaObject } from 'openapi3-ts/oas31';
import { TableIdentity } from 'table-identity';
import { useId } from 'vue';
import { BeanControllerBase, ModelValue, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormMeta, IFormProvider, TypeFormOnSubmitData } from 'zova-module-a-form';
import { DataMutation } from 'zova-module-a-model';

export interface ControllerWrapperFormProps {
  rowId?: TableIdentity;
  formMeta: IFormMeta;
  formProvider?: IFormProvider;
  getMutationSubmit?: () => DataMutation | undefined;
}

export interface ControllerWrapperFormModels {
  'vModel:formVisible'?: boolean;
}

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  static $propsDefault = {
    formVisible: false,
  };

  formDomId: string;
  formSchema?: SchemaObject;
  formData?: any;

  controllerForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  @ModelValue()
  modelFormVisible: boolean;

  protected async __init__() {
    this.formDomId = useId();
    this.formSchema = this.$useComputed(() => {
      return this.$$restResource.getFormSchema(this.formMeta);
    });
    this.formData = this.$useComputed(() => {
      return this.$$restResource.getFormData(this.formMeta, this.rowId);
    });
  }

  get rowId() {
    return this.$props.rowId;
  }

  get formMeta() {
    return this.$props.formMeta;
  }

  async onSubmit(data: TypeFormOnSubmitData) {
    const mutationSubmit = this.$props.getMutationSubmit?.();
    await mutationSubmit?.mutateAsync(data.value as any);
  }
}
