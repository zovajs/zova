import { BeanBase } from 'zova';
import { ApiMeta } from 'zova-module-a-api';
import { ApiApiHomeindexPath } from '../api/home.js';

@ApiMeta()
export class ApiMetaHome extends BeanBase {
  get index() {
    return [ApiApiHomeindexPath, 'get'];
  }
}
