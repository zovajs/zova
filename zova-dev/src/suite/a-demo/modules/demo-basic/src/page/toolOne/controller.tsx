import { z } from 'zod';
import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelTest } from '../../model/test.js';

export const ControllerPageToolOneSchemaQuery = z.object({
  api: z.string().optional(),
});

@Controller()
export class ControllerPageToolOne extends BeanControllerPageBase {
  @Use()
  $$modelTest: ModelTest;

  protected async __init__() {
    if (!this.$query.api) return;
    const api = this.sys.config.api.prefix + this.$query.api;
    const data = await this.$fetch.post<any, any>(
      this.sys.util.apiActionPathTranslate(api),
      undefined,
      this.sys.util.apiActionConfigPrepare(undefined, { openapiSchema: true }),
    );
    console.log('openapi schema: ', data);
  }
}
