import { BeanBase } from 'zova';
import { ApiSchema, IApiSchemaFetchOptions } from 'zova-module-a-api';
import { ApiApiHomeindexPath } from '../api/home.js';

@ApiSchema()
export class ApiSchemaHome extends BeanBase {
  index(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeindexPath, 'get', options);
  }
}
