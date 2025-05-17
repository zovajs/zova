import { SchemaObject } from 'openapi3-ts/oas31';
import { useId } from 'vue';
import { BeanControllerBase, Model, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormMeta, IFormProvider, TypeFormOnSubmitData } from 'zova-module-a-form';
import { DataMutation } from 'zova-module-a-model';
import { ControllerPageResource } from 'zova-module-a-rest';

export interface ControllerWrapperFormProps {
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
  schemaCreate?: SchemaObject;
  schema?: SchemaObject;
  formData?: any;

  controllerRestForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  @Model()
  modelFormVisible: boolean;

  protected async __init__() {
    this.formDomId = useId();
    this.schemaCreate = this.$useComputed(() => {
      const querySdkCreate = this.$$restResource.getQuerySdkCreate();
      return this.$$restResource.getSchemaOfFormCreate(querySdkCreate.data?.operationObject);
    });
    this.schema = this.$useComputed(() => {
      const formMeta = this.$props.formMeta;
      if (formMeta.formMode === 'edit') {
        if (formMeta.editMode === 'create') return this.schemaCreate;
      }
    });
    this.formData = this.$useComputed(() => {
      const formMeta = this.$props.formMeta;
      if (formMeta.formMode === 'edit' && formMeta.editMode === 'create') {
        const queryData = this.$$restResource.getQueryDataDefaultValue(this.schemaCreate);
        return queryData?.data;
      }
    });
  }

  async onSubmit(data: TypeFormOnSubmitData) {
    const mutationSubmit = this.$props.getMutationSubmit?.();
    mutationSubmit?.mutate(data.value as any, { onSuccess: () => {
      this.modelFormVisible = false;
    } });
  }
}
