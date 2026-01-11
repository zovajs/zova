import { ApiSchema } from 'zova-module-a-api';
import { BeanApiSchemaBase } from 'zova-module-a-openapi';
import { ApiApiHomeindexPath } from '../api/home.js';

@ApiSchema()
export class ApiSchemaHome extends BeanApiSchemaBase {
  get index() {
    return this.$createApiSchemas(ApiApiHomeindexPath, 'get');
  }
}
