import type { BeanResource } from 'zova-module-rest-resource';
import { isNil } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { TableIdentity } from 'table-identity';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormMeta, IFormProvider, TypeFormOnSubmitData } from 'zova-module-a-form';

export interface ControllerWrapperFormProps {
  rowId?: TableIdentity;
  formMeta: IFormMeta;
  formProvider?: IFormProvider;
  onControllerForm?: (ref: ControllerForm) => void;
}

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  static $propsDefault = {};

  formSchema?: SchemaObject;
  formData?: any;

  @Use({ injectionScope: 'host' })
  $$beanResource: BeanResource;

  protected async __init__() {
    this.formSchema = this.$useComputed(() => {
      return this.$$beanResource.getFormSchema(this.formMeta);
    });
    this.formData = this.$useComputed(() => {
      return this.$$beanResource.getFormData(this.formMeta, this.rowId);
    });
    // load data
    // if (process.env.SERVER) {
    await this._loadData();
    // }
  }

  get rowId() {
    return this.$props.rowId;
  }

  get formMeta() {
    return this.$props.formMeta;
  }

  async onSubmit(data: TypeFormOnSubmitData) {
    const mutationSubmit = this.$$beanResource.getFormMutationSubmit(this.formMeta, this.rowId);
    await mutationSubmit?.mutateAsync(data.value as any);
  }

  async _loadData() {
    if (isNil(this.rowId)) return;
    const queryDataGet = this.$$beanResource.getQueryDataGet(this.rowId);
    await queryDataGet.suspense();
  }
}
