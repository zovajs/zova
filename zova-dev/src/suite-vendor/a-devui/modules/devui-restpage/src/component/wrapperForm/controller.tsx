import type { ModelResource } from 'zova-module-rest-resource';
import { isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { TableIdentity } from 'table-identity';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormCelScope, IFormMeta, IFormProvider, TypeFormOnSubmitData } from 'zova-module-a-form';
import { $QueryAutoLoad } from 'zova-module-a-model';

export interface ControllerWrapperFormProps {
  entryId?: TableIdentity;
  formMeta: IFormMeta;
  formProvider?: IFormProvider;
  formScope?: IFormCelScope;
  onControllerForm?: (ref: ControllerForm) => void;
}

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  static $propsDefault = {};

  formSchema?: SchemaObject;
  formData?: any;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  protected async __init__() {
    this.formSchema = this.$useComputed(() => {
      return this.$$modelResource.getFormSchema(this.formMeta);
    });
    this.formData = this.$useComputed(() => {
      return this.$$modelResource.getFormData(this.formMeta, this.entryId);
    });
    // load data
    await $QueryAutoLoad(() => this.queryData);
  }

  get entryId() {
    return this.$props.entryId;
  }

  get formMeta() {
    return this.$props.formMeta;
  }

  get queryData() {
    if (isNil(this.entryId)) return;
    return this.$$modelResource.view(this.entryId);
  }

  async onSubmit(data: TypeFormOnSubmitData) {
    const mutationSubmit = this.$$modelResource.getFormMutationSubmit(this.formMeta, this.entryId);
    await mutationSubmit?.mutateAsync(data.value as any);
  }
}
