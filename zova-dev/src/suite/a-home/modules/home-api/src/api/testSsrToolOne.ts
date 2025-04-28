import type { components, paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** TestSsrToolOne_test */
export const ApiApiTestSsrToolOnetestPath = '/api/test/ssr/toolOne/test/{id?}';
export type ApiApiTestSsrToolOnetestPath = '/api/test/ssr/toolOne/test/{id?}';
export type ApiApiTestSsrToolOnetestMethod = 'post';
export type ApiApiTestSsrToolOnetestRequestParams = paths[ApiApiTestSsrToolOnetestPath][ApiApiTestSsrToolOnetestMethod]['parameters']['path'];
export type ApiApiTestSsrToolOnetestRequestQuery = paths[ApiApiTestSsrToolOnetestPath][ApiApiTestSsrToolOnetestMethod]['parameters']['query'];
export type ApiApiTestSsrToolOnetestRequestHeaders = paths[ApiApiTestSsrToolOnetestPath][ApiApiTestSsrToolOnetestMethod]['parameters']['header'];
export type ApiApiTestSsrToolOnetestRequestBody = components['schemas']['test-ssr.dto.testBody']
;
export type ApiApiTestSsrToolOnetestResponseBody = paths[ApiApiTestSsrToolOnetestPath][ApiApiTestSsrToolOnetestMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiTestSsrToolOne extends BeanApiBase {
  test(
    body: ApiApiTestSsrToolOnetestRequestBody,
    options: {
      params: ApiApiTestSsrToolOnetestRequestParams;
      query: ApiApiTestSsrToolOnetestRequestQuery;
      headers?: ApiApiTestSsrToolOnetestRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiTestSsrToolOnetestResponseBody>(
      this.$pathTranslate(ApiApiTestSsrToolOnetestPath, options.params),
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }
}
