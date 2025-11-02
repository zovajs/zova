import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ApiApiHomeUserPassportloginRequestBody } from 'zova-module-home-api';
import { ModelPassport } from '../../model/passport.js';

@Controller()
export class ControllerPageLogin extends BeanControllerPageBase {
  @Use()
  $$modelPassport: ModelPassport;

  user: ApiApiHomeUserPassportloginRequestBody = {
    username: 'admin',
    password: '',
    captcha: {
      id: '',
      token: '',
    },
  };

  async login() {
    await this.$$modelPassport.login().mutateAsync(this.user);
  }
}
