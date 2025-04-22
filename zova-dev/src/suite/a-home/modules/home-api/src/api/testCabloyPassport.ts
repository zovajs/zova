import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** TestCabloyPassport_isAuthenticated */
export const ApiApiTestCabloyPassportisAuthenticatedPath = '/api/test/cabloy/passport/isAuthenticated';
export type ApiApiTestCabloyPassportisAuthenticatedPath = '/api/test/cabloy/passport/isAuthenticated';
export type ApiApiTestCabloyPassportisAuthenticatedMethod = 'get';
export type ApiApiTestCabloyPassportisAuthenticatedRequestHeaders = paths[ApiApiTestCabloyPassportisAuthenticatedPath][ApiApiTestCabloyPassportisAuthenticatedMethod]['parameters']['header'];
export type ApiApiTestCabloyPassportisAuthenticatedResponseBody = paths[ApiApiTestCabloyPassportisAuthenticatedPath][ApiApiTestCabloyPassportisAuthenticatedMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiTestCabloyPassport extends BeanApiBase {
  isAuthenticated(

    options?: {
      headers?: ApiApiTestCabloyPassportisAuthenticatedRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiTestCabloyPassportisAuthenticatedResponseBody>(
      ApiApiTestCabloyPassportisAuthenticatedPath,
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }
}
