import { BeanBase } from 'zova';
import { ApiMeta } from 'zova-module-a-api';
import { ApiApiTestSsrToolOnetestGetPath, ApiApiTestSsrToolOnetestPath } from '../api/testSsrToolOne.js';

@ApiMeta()
export class ApiMetaTestSsrToolOne extends BeanBase {
  get testGet() {
    return [ApiApiTestSsrToolOnetestGetPath, 'get'];
  }

  get test() {
    return [ApiApiTestSsrToolOnetestPath, 'post'];
  }
}
