import { SchemaObject } from 'openapi3-ts/oas31';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerFormBase, IFormMeta, TypeForm } from 'zova-module-a-form';

export interface ControllerRestFormProps<T extends {} = {}> {
  data?: T;
  schema?: SchemaObject;
  formMeta?: IFormMeta;
}

@Controller()
export class ControllerRestForm extends BeanControllerFormBase {
  static $propsDefault = {};

  form: TypeForm;

  protected async __init__() {
    this.form = this.$useForm({
      defaultValues: this.$props.data as any,
      onSubmit: async ({ value }) => {
        console.log('submit: ', JSON.stringify(value));
      },
    });
  }
}
