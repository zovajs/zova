import { ApiSchema } from 'zova-module-a-api';
import { BeanApiSchemaBase } from 'zova-module-a-openapi';
import { ApiApiTestSsrToolOnetestGetPath, ApiApiTestSsrToolOnetestPath } from '../api/testSsrToolOne.js';

@ApiSchema()
export class ApiSchemaTestSsrToolOne extends BeanApiSchemaBase {
  get testGet() {
    return this.$createApiSchemas(ApiApiTestSsrToolOnetestGetPath, 'get');
  }

  get test() {
    return this.$createApiSchemas(ApiApiTestSsrToolOnetestPath, 'post');
  }
}
