import { z } from 'zod';
import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export const ControllerPageAuthCallbackSchemaQuery = z.object({
  returnTo: z.string().optional(),
});

@Controller()
export class ControllerPageAuthCallback extends BeanControllerPageBase {
  protected async __init__() {}

  protected render() {
    return null;
  }
}
