import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeFormOnSubmitData } from 'zova-module-a-form';
import { ApiApiHomeUserPassportloginRequestBody } from 'zova-module-home-api';
import { ModelPassport } from '../../model/passport.js';

@Controller()
export class ControllerPageLogin extends BeanControllerPageBase {
  @Use()
  $$modelPassport: ModelPassport;

  user: ApiApiHomeUserPassportloginRequestBody = {
    username: process.env.DEV ? 'admin' : '',
    password: process.env.DEV ? '123456' : '',
    captcha: {
      id: '',
      token: '',
    },
  };

  get schema() {
    return this.$$modelPassport.schemaLogin;
  }

  async onSubmitLogin(data: TypeFormOnSubmitData<ApiApiHomeUserPassportloginRequestBody>) {
    await this.$$modelPassport.login().mutateAsync(data.value);
  }
}
