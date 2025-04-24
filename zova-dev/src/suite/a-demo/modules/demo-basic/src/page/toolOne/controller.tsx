import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelTest } from '../../model/test.js';

@Controller()
export class ControllerPageToolOne extends BeanControllerPageBase {
  @Use()
  $$modelTest: ModelTest;

  protected async __init__() {
    const data = await this.$api.testSsrToolOne.test(undefined as any, {
      openapiSchema: true,
    } as any);
    console.log('openapi schema: ', data);
  }
}
