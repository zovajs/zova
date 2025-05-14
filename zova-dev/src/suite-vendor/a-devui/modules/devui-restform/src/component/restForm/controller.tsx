import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta } from 'zova-module-a-form';

export interface ControllerRestFormProps<T extends {} = {}> {
  data?: T;
  schema?: SchemaObject;
  formMeta?: IFormMeta;
}

@Controller()
export class ControllerRestForm extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}
