import { sleep } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { useId } from 'vue';
import { BeanControllerBase, Model, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormBehaviors, IFormMeta, TypeFormOnSubmit, TypeFormOnSubmitData } from 'zova-module-a-form';
import { ControllerPageResource } from 'zova-module-a-rest';
import { ControllerRestForm } from 'zova-module-devui-restform';

export interface ControllerWrapperFormProps {
  formMeta: IFormMeta;
  formBehaviors?: IFormBehaviors;
  onSubmit?: TypeFormOnSubmit;
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

  controllerRestForm: ControllerRestForm;

  loading: boolean;

  dialogErrorOpened: boolean;
  dialogErrorMessage: string;

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
    try {
      this.loading = true;
      await sleep(1000);
      await this.$props.onSubmit?.(data);
      this.modelFormVisible = false;
    } catch (err: any) {
      this.dialogErrorOpened = true;
      this.dialogErrorMessage = err.message;
    } finally {
      this.loading = false;
    }
  }
}
