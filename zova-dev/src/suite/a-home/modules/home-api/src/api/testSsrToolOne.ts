import type { components, paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** TestSsrToolOne_testSchema */
export const ApiApiTestSsrToolOnetestSchemaPath = '/api/test/ssr/toolOne/testSchema/{id?}';
export type ApiApiTestSsrToolOnetestSchemaPath = '/api/test/ssr/toolOne/testSchema/{id?}';
export type ApiApiTestSsrToolOnetestSchemaMethod = 'post';
export type ApiApiTestSsrToolOnetestSchemaRequestParams = paths[ApiApiTestSsrToolOnetestSchemaPath][ApiApiTestSsrToolOnetestSchemaMethod]['parameters']['path'];
export type ApiApiTestSsrToolOnetestSchemaRequestQuery = paths[ApiApiTestSsrToolOnetestSchemaPath][ApiApiTestSsrToolOnetestSchemaMethod]['parameters']['query'];
export type ApiApiTestSsrToolOnetestSchemaRequestHeaders = paths[ApiApiTestSsrToolOnetestSchemaPath][ApiApiTestSsrToolOnetestSchemaMethod]['parameters']['header'];
export type ApiApiTestSsrToolOnetestSchemaRequestBody = components['schemas']['test-ssr.dto.testBody']
;
export type ApiApiTestSsrToolOnetestSchemaResponseBody = paths[ApiApiTestSsrToolOnetestSchemaPath][ApiApiTestSsrToolOnetestSchemaMethod]['responses']['200']['content']['application/json']['data'];

/** TestSsrToolOne_testRender */
export const ApiApiTestSsrToolOnetestRenderPath = '/api/test/ssr/toolOne/testRender/{id?}';
export type ApiApiTestSsrToolOnetestRenderPath = '/api/test/ssr/toolOne/testRender/{id?}';
export type ApiApiTestSsrToolOnetestRenderMethod = 'get';
export type ApiApiTestSsrToolOnetestRenderRequestParams = paths[ApiApiTestSsrToolOnetestRenderPath][ApiApiTestSsrToolOnetestRenderMethod]['parameters']['path'];
export type ApiApiTestSsrToolOnetestRenderRequestQuery = paths[ApiApiTestSsrToolOnetestRenderPath][ApiApiTestSsrToolOnetestRenderMethod]['parameters']['query'];
export type ApiApiTestSsrToolOnetestRenderRequestHeaders = paths[ApiApiTestSsrToolOnetestRenderPath][ApiApiTestSsrToolOnetestRenderMethod]['parameters']['header'];
export type ApiApiTestSsrToolOnetestRenderResponseBody = paths[ApiApiTestSsrToolOnetestRenderPath][ApiApiTestSsrToolOnetestRenderMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiTestSsrToolOne extends BeanApiBase {
  testSchema(
    body: ApiApiTestSsrToolOnetestSchemaRequestBody,
    options: {
      params: ApiApiTestSsrToolOnetestSchemaRequestParams;
      query: ApiApiTestSsrToolOnetestSchemaRequestQuery;
      headers?: ApiApiTestSsrToolOnetestSchemaRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiTestSsrToolOnetestSchemaResponseBody>(
      this.$pathTranslate(ApiApiTestSsrToolOnetestSchemaPath, options.params),
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }

  testRender(

    options: {
      params: ApiApiTestSsrToolOnetestRenderRequestParams;
      query: ApiApiTestSsrToolOnetestRenderRequestQuery;
      headers?: ApiApiTestSsrToolOnetestRenderRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiTestSsrToolOnetestRenderResponseBody>(
      this.$pathTranslate(ApiApiTestSsrToolOnetestRenderPath, options.params),
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }
}
