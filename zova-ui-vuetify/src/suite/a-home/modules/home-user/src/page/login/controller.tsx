import { z } from 'zod';
import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeFormOnSubmitData } from 'zova-module-a-form';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { ApiApiHomeUserPassportloginRequestBody } from 'zova-module-home-api';

export const ControllerPageLoginSchemaQuery = z.object({
  returnTo: z.string().optional(),
});

@Controller()
export class ControllerPageLogin extends BeanControllerPageBase {
  user: ApiApiHomeUserPassportloginRequestBody = {
    username: process.env.DEV ? 'admin' : '',
    password: process.env.DEV ? '123456' : '',
    captcha: {
      id: '',
      token: '',
    },
  };

  protected async __init__() {
    await $QueryAutoLoad(() => this.$passport.apiSchemasLogin.sdk);
  }

  get schema() {
    return this.$passport.schemaLogin;
  }

  async onSubmitLogin(data: TypeFormOnSubmitData<ApiApiHomeUserPassportloginRequestBody>) {
    await this.$passport.login().mutateAsync(data.value);
  }
}
