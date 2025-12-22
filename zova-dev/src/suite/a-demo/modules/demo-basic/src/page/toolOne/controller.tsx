import { OperationObject, SchemaObject } from 'openapi3-ts/oas31';
import { z } from 'zod';
import { cast, Use, usePrepareArg } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerPageFormBase, ControllerForm, IFormMeta, TypeForm, TypeFormOnSubmitData } from 'zova-module-a-form';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { getSchemaOfRequestBody, ModelSdk } from 'zova-module-a-openapi';
import { ApiSchemaTestSsrDtoTestBodyPartial } from 'zova-module-home-api';
import { ModelTest } from '../../model/test.js';

export const ControllerPageToolOneSchemaParams = z.object({
  id: z.number().optional(),
});

export const ControllerPageToolOneSchemaQuery = z.object({
  name: z.string().optional(),
  api: z.string().optional(),
  apiMethod: z.string().optional(),
});

@Controller()
export class ControllerPageToolOne extends BeanControllerPageFormBase {
  form: TypeForm<ApiSchemaTestSsrDtoTestBodyPartial>;
  public schemaUpdate?: SchemaObject;

  @Use()
  $$modelTest: ModelTest;

  @Use({ beanFullName: 'a-openapi.model.sdk' })
  get $$modelSdk(): ModelSdk {
    return usePrepareArg(
      this.app.meta.locale.current,
      true,
    );
  }

  controllerForm: ControllerForm;
  fieldName: string = 'name';
  formData: ApiSchemaTestSsrDtoTestBodyPartial;
  formMeta: IFormMeta;

  protected async __init__() {
    if (this.$query.api) {
      this.schemaUpdate = this.$useComputed(() => {
        const querySdkUpdate = this.getQuerySdkUpdate();
        const querySchema = this.getQuerySchemaOfFormUpdate(querySdkUpdate.data?.operationObject);
        return querySchema?.data;
      });
      // sdk
      const querySdk = await $QueryAutoLoad(() => this.getQuerySdkUpdate());
      console.log('sdk: ', querySdk?.data);
      // form data
      this.formData = {
        name: 'tom',
      };
      this.formMeta = {
        formMode: 'edit',
        editMode: 'update',
      };
      // form
      this.form = this.$useForm({
        defaultValues: this.formData,
        onSubmit: async ({ value }) => {
          console.log('submit manual: ', JSON.stringify(value));
        },
      });
      // setInterval(()=>{
      //   this.fieldName=this.fieldName==='name'?'married':'name';
      // },1000)
    }
  }

  async onSubmit(data: TypeFormOnSubmitData<ApiSchemaTestSsrDtoTestBodyPartial>) {
    console.log('submit auto: ', JSON.stringify(data.value));
    this.formData = data.value;
  }

  protected getQuerySdkUpdate() {
    return this.$$modelSdk.getSdk(this.$query.api, this.$query.apiMethod as any)!;
  }

  protected getQuerySchemaOfFormUpdate(operationObject?: OperationObject) {
    const schemaData = getSchemaOfRequestBody(operationObject);
    const schemaName = cast(schemaData)?.$ref;
    if (!schemaName) return;
    return this.$$modelSdk.getSchema(schemaName);
  }
}
