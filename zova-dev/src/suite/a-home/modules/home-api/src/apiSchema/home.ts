import { BeanBase } from 'zova';
import { ApiSchema } from 'zova-module-a-api';
import { ApiApiHomeindexPath } from '../api/home.js';

@ApiSchema()
export class ApiSchemaHome extends BeanBase {
  get index() {
    return this.$sdk.createApiSchemas(ApiApiHomeindexPath, 'get');
  }
}
