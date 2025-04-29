import { z } from 'zod';
import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { SysSdk } from 'zova-module-a-openapi';
import { ModelTest } from '../../model/test.js';

export const ControllerPageToolOneSchemaParams = z.object({
  id: z.number().optional(),
});

export const ControllerPageToolOneSchemaQuery = z.object({
  name: z.string().optional(),
  api: z.string().optional(),
});

@Controller()
export class ControllerPageToolOne extends BeanControllerPageBase {
  @Use()
  $$modelTest: ModelTest;

  @Use()
  $$sysSdk: SysSdk;

  protected async __init__() {
    console.log('api: ', this.$query.api);
    await this.$$sysSdk.loadSdk(this.$fetch, this.$query.api);
  }
}
