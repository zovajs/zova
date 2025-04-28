import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** TestSsrToolTwo_test */
export const ApiApiTestSsrToolTwotestPath = '/api/test/ssr/toolTwo/test/{id?}';
export type ApiApiTestSsrToolTwotestPath = '/api/test/ssr/toolTwo/test/{id?}';
export type ApiApiTestSsrToolTwotestMethod = 'get';
export type ApiApiTestSsrToolTwotestRequestParams = paths[ApiApiTestSsrToolTwotestPath][ApiApiTestSsrToolTwotestMethod]['parameters']['path'];
export type ApiApiTestSsrToolTwotestRequestQuery = paths[ApiApiTestSsrToolTwotestPath][ApiApiTestSsrToolTwotestMethod]['parameters']['query'];
export type ApiApiTestSsrToolTwotestResponseBody = paths[ApiApiTestSsrToolTwotestPath][ApiApiTestSsrToolTwotestMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiTestSsrToolTwo extends BeanApiBase {
  test(

    options: {
      params: ApiApiTestSsrToolTwotestRequestParams;
      query: ApiApiTestSsrToolTwotestRequestQuery;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiTestSsrToolTwotestResponseBody>(
      this.$pathTranslate(ApiApiTestSsrToolTwotestPath, options.params),
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }
}
