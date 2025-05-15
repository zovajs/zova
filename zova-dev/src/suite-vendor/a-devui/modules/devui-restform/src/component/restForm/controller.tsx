import { SchemaObject } from 'openapi3-ts/oas31';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerFormBase, IFormBehaviors, IFormMeta, TypeForm } from 'zova-module-a-form';

export interface ControllerRestFormProps<T extends {} = {}> {
  data?: T;
  schema?: SchemaObject;
  formMeta?: IFormMeta;
  formBehaviors?: IFormBehaviors;
}

@Controller()
export class ControllerRestForm extends BeanControllerFormBase {
  static $propsDefault = {};

  form: TypeForm;
  formBehaviors: IFormBehaviors;

  protected async __init__() {
    this.form = this.$useForm({
      defaultValues: this.$props.data as any,
      onSubmit: async ({ value }) => {
        console.log('submit: ', JSON.stringify(value));
      },
    });
    this.formBehaviors = this.$useComputed(() => {
      return Object.assign({
        formFieldLayout: 'devui-restform:formFieldLayout',
      }, this.$props.formBehaviors);
    });
  }
}
