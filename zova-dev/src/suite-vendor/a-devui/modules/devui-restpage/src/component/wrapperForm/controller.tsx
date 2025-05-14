import { SchemaObject } from 'openapi3-ts/oas31';
import { useId } from 'vue';
import { BeanControllerBase, cast, Model, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta } from 'zova-module-a-form';
import { ControllerPageResource } from 'zova-module-a-rest';

export interface ControllerWrapperFormProps {
  formMeta: IFormMeta;
}

export interface ControllerWrapperFormModels {
  'vModel:formVisible'?: boolean;
}

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  static $propsDefault = {
    formVisible: false,
  };

  formId: string;
  schemaCreate?: SchemaObject;
  schema?: SchemaObject;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  @Model()
  modelFormVisible: boolean;

  protected async __init__() {
    this.formId = useId();
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
  }

  showModal() {
    const dialog = cast<HTMLDialogElement | undefined>(document.getElementById(this.formId));
    dialog?.showModal();
  }
}
