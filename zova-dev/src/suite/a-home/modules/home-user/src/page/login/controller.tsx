import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ServiceAuthLoginParams } from '../../service/auth.js';
import { ModelAuth } from '../../model/auth.js';

@Controller()
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
