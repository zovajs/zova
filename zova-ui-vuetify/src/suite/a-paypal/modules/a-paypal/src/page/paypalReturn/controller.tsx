import { z } from 'zod';
import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export const ControllerPagePaypalReturnSchemaQuery = z.object({
  recordId: z.string(),
});

@Controller()
export class ControllerPagePaypalReturn extends BeanControllerPageBase {
  protected async __init__() {}

  protected render() {
    return <div>{`return:${this.$query.recordId}`}</div>;
  }
}
