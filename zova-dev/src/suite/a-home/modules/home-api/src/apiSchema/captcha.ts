import { ApiSchema } from 'zova-module-a-api';
import { BeanApiSchemaBase } from 'zova-module-a-openapi';
import { ApiApiCaptchacreatePath, ApiApiCaptcharefreshPath, ApiApiCaptchaverifyImmediatePath } from '../api/captcha.js';

@ApiSchema()
export class ApiSchemaCaptcha extends BeanApiSchemaBase {
  get create() {
    return this.$createApiSchemas(ApiApiCaptchacreatePath, 'post');
  }

  get refresh() {
    return this.$createApiSchemas(ApiApiCaptcharefreshPath, 'post');
  }

  get verifyImmediate() {
    return this.$createApiSchemas(ApiApiCaptchaverifyImmediatePath, 'post');
  }
}
