import { BeanBase } from 'zova';
import { ApiSchema, IApiSchemaFetchOptions } from 'zova-module-a-api';
import { ApiApiTestSsrToolOnetestGetPath, ApiApiTestSsrToolOnetestPath } from '../api/testSsrToolOne.js';

@ApiSchema()
export class ApiSchemaTestSsrToolOne extends BeanBase {
  testGet(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiTestSsrToolOnetestGetPath, 'get', options);
  }

  test(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiTestSsrToolOnetestPath, 'post', options);
  }
}
