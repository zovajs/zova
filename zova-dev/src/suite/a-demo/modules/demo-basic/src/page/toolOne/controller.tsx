import { z } from 'zod';
import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelSdk } from 'zova-module-a-openapi';
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
export class ControllerPageToolOne extends BeanControllerPageBase {
  @Use()
  $$modelTest: ModelTest;

  @Use()
  $$modelSdk: ModelSdk;

  protected async __init__() {
    if (this.$query.api) {
      const { suspense } = this.$$modelSdk.getSdk(this.$query.api, this.$query.apiMethod)!;
      await suspense();
    }
  }
}
