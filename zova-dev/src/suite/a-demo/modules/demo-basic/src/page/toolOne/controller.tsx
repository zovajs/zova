import { z } from 'zod';
import { Use, usePrepareArg } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerPageFormBase, TypeForm } from 'zova-module-a-form';
import { ModelSdk } from 'zova-module-a-openapi';
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

  @Use()
  $$modelTest: ModelTest;

  @Use({ beanFullName: 'a-openapi.model.sdk' })
  get $$modelSdk(): ModelSdk {
    return usePrepareArg(
      this.app.meta.locale.current,
      true,
    );
  }

  fieldName: string = 'name';

  protected async __init__() {
    if (this.$query.api) {
      // sdk
      const querySdk = this.$$modelSdk.getSdk(this.$query.api, this.$query.apiMethod as any)!;
      await querySdk.suspense();
      console.log('sdk: ', querySdk.data);
      // form
      this.form = this.$useForm({
        defaultValues: { name: 'ss' } as ApiSchemaTestSsrDtoTestBodyPartial,
        onSubmit: async ({ value }) => {
          console.log('submit: ', JSON.stringify(value));
        },
      });
      // setInterval(()=>{
      //   this.fieldName=this.fieldName==='name'?'married':'name';
      // },1000)
    }
  }
}
