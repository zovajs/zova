import { BeanControllerPageBase, Use, zz } from 'zova';
import { Local } from 'zova-module-a-bean';
import { ServiceAuthLoginParams } from '../../service/auth.js';
import { ModelAuth } from '../../model/auth.js';

const ParamsSchema = zz.object({});
const QuerySchema = zz.object({});

@Local()
export class ControllerPageLogin extends BeanControllerPageBase {
  @Use()
  $$modelAuth: ModelAuth;

  user: ServiceAuthLoginParams = {
    username: 'admin',
    password: '',
  };

  async login() {
    await this.$$modelAuth.login().mutateAsync(this.user);
  }
}

export interface ControllerPageLogin {
  $params: ControllerPageLogin.ParamsOutput;
  $query: ControllerPageLogin.QueryOutput;
}

export namespace ControllerPageLogin {
  export const paramsSchema = ParamsSchema;
  export type ParamsInput = zz.input<typeof ParamsSchema>;
  export type ParamsOutput = zz.output<typeof ParamsSchema>;

  export const querySchema = QuerySchema;
  export type QueryInput = zz.input<typeof QuerySchema>;
  export type QueryOutput = zz.output<typeof QuerySchema>;
}
