import { z } from 'zod';
import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export const ControllerPageAuthCallbackSchemaQuery = z.object({
  'returnTo': z.string().optional(),
  'x-vona-oauth-code': z.string().optional(),
});

@Controller()
export class ControllerPageAuthCallback extends BeanControllerPageBase {
  protected async __init__() {
    if (process.env.CLIENT) {
      // should not use await
      this._handleAuth();
    }
  }

  private _handleAuth() {

  }

  protected render() {
    return null;
  }
}
