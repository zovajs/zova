import { ApiSchema } from 'zova-module-a-api';
import { BeanApiSchemaBase } from 'zova-module-a-openapi';
import { ApiApiTestVonaCaptchasigninPath } from '../api/testVonaCaptcha.js';

@ApiSchema()
export class ApiSchemaTestVonaCaptcha extends BeanApiSchemaBase {
  get signin() {
    return this.$createApiSchemas(ApiApiTestVonaCaptchasigninPath, 'post');
  }
}
