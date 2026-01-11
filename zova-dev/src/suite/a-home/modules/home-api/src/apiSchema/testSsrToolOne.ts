import { BeanBase } from 'zova';
import { ApiSchema } from 'zova-module-a-api';
import { ApiApiTestSsrToolOnetestGetPath, ApiApiTestSsrToolOnetestPath } from '../api/testSsrToolOne.js';

@ApiSchema()
export class ApiSchemaTestSsrToolOne extends BeanBase {
  get testGet() {
    return this.$sdk.createApiSchemas(ApiApiTestSsrToolOnetestGetPath, 'get');
  }

  get test() {
    return this.$sdk.createApiSchemas(ApiApiTestSsrToolOnetestPath, 'post');
  }
}
