import { z } from 'zod';
import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export const ControllerPagePaypalCancelSchemaQuery = z.object({
  recordId: z.string(),
});

@Controller()
export class ControllerPagePaypalCancel extends BeanControllerPageBase {
  protected async __init__() {}

  protected render() {
    return <div>{`cancel:${this.$query.recordId}`}</div>;
  }
}
