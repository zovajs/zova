import { SchemaObject } from 'openapi3-ts/oas31';
import { useId } from 'vue';
import { BeanControllerBase, Model, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormMeta, IFormProvider, TypeFormOnSubmitData } from 'zova-module-a-form';
import { DataMutation } from 'zova-module-a-model';
import { ControllerPageResource } from 'zova-module-a-rest';

export interface ControllerWrapperFormProps {
  formData?: any;
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
  schemaView?: SchemaObject;
  schemaCreate?: SchemaObject;
  schemaUpdate?: SchemaObject;
  schema?: SchemaObject;
  formData?: any;

  controllerRestForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  @Model()
  modelFormVisible: boolean;

  protected async __init__() {
    this.formDomId = useId();
    this.schemaView = this.$useComputed(() => {
      const querySdkView = this.$$restResource.getQuerySdkView();
      const querySchema = this.$$restResource.getQuerySchemaOfFormView(querySdkView.data?.operationObject);
      return querySchema?.data;
    });
    this.schemaCreate = this.$useComputed(() => {
      const querySdkCreate = this.$$restResource.getQuerySdkCreate();
      const querySchema = this.$$restResource.getQuerySchemaOfFormCreate(querySdkCreate.data?.operationObject);
      return querySchema?.data;
    });
    this.schemaUpdate = this.$useComputed(() => {
      const querySdkUpdate = this.$$restResource.getQuerySdkUpdate();
      const querySchema = this.$$restResource.getQuerySchemaOfFormUpdate(querySdkUpdate.data?.operationObject);
      return querySchema?.data;
    });
    this.schema = this.$useComputed(() => {
      const formMeta = this.$props.formMeta;
      if (formMeta.formMode === 'view') return this.schemaView;
      if (formMeta.formMode === 'edit') {
        if (formMeta.editMode === 'create') return this.schemaCreate;
        if (formMeta.editMode === 'update') return this.schemaUpdate;
      }
    });
    this.formData = this.$useComputed(() => {
      const formMeta = this.$props.formMeta;
      if (formMeta.formMode === 'view') {
        return this.$props.formData;
      }
      if (formMeta.formMode === 'edit') {
        if (formMeta.editMode === 'create') {
          const queryData = this.$$restResource.getQueryDataDefaultValue(this.schemaCreate);
          return queryData?.data;
        }
        if (formMeta.editMode === 'update') {
          return this.$props.formData;
        }
      }
    });
  }

  get formMeta() {
    return this.$props.formMeta;
  }

  async onSubmit(data: TypeFormOnSubmitData) {
    const mutationSubmit = this.$props.getMutationSubmit?.();
    await mutationSubmit?.mutateAsync(data.value as any);
    this.modelFormVisible = false;
  }
}
