import { BeanBase } from 'zova';
import { ApiSchema } from 'zova-module-a-api';
import { ApiApiTestVonaCaptchasigninPath } from '../api/testVonaCaptcha.js';

@ApiSchema()
export class ApiSchemaTestVonaCaptcha extends BeanBase {
  get signin() {
    return this.$sdk.createApiSchemas(ApiApiTestVonaCaptchasigninPath, 'post');
  }
}
