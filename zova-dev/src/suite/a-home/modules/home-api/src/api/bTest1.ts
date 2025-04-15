import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { ApiBaseURL } from './openapi/index.js';

/** BTest1_index */
export const ApiApiBTest1indexPath = '/api/b/test1';
export type ApiApiBTest1indexPath = '/api/b/test1';
export type ApiApiBTest1indexMethod = 'get';
export type ApiApiBTest1indexResponseBody = paths[ApiApiBTest1indexPath][ApiApiBTest1indexMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiBTest1 extends BeanApiBase {
  index(

    options?: IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiBTest1indexResponseBody>(
      ApiApiBTest1indexPath,
      this.$configPrepare(ApiBaseURL(this.sys), options),
    );
  }
}
