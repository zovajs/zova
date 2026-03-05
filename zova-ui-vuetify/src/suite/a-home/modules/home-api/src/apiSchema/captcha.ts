import { BeanBase } from 'zova';
import { ApiSchema, IApiSchemaFetchOptions } from 'zova-module-a-api';
import { ApiApiCaptchacreatePath, ApiApiCaptcharefreshPath, ApiApiCaptchaverifyImmediatePath } from '../api/captcha.js';

@ApiSchema()
export class ApiSchemaCaptcha extends BeanBase {
  create(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiCaptchacreatePath, 'post', options);
  }

  refresh(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiCaptcharefreshPath, 'post', options);
  }

  verifyImmediate(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiCaptchaverifyImmediatePath, 'post', options);
  }
}
