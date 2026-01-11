import { BeanBase } from 'zova';
import { ApiSchema } from 'zova-module-a-api';
import { ApiApiCaptchacreatePath, ApiApiCaptcharefreshPath, ApiApiCaptchaverifyImmediatePath } from '../api/captcha.js';

@ApiSchema()
export class ApiSchemaCaptcha extends BeanBase {
  get create() {
    return this.$sdk.createApiSchemas(ApiApiCaptchacreatePath, 'post');
  }

  get refresh() {
    return this.$sdk.createApiSchemas(ApiApiCaptcharefreshPath, 'post');
  }

  get verifyImmediate() {
    return this.$sdk.createApiSchemas(ApiApiCaptchaverifyImmediatePath, 'post');
  }
}
