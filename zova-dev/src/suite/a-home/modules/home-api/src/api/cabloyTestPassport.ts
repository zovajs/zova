import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** CabloyTestPassport_isAuthenticated */
export const ApiApiCabloyTestPassportisAuthenticatedPath = '/api/cabloy/test/passport/isAuthenticated';
export type ApiApiCabloyTestPassportisAuthenticatedPath = '/api/cabloy/test/passport/isAuthenticated';
export type ApiApiCabloyTestPassportisAuthenticatedMethod = 'get';
export type ApiApiCabloyTestPassportisAuthenticatedResponseBody = paths[ApiApiCabloyTestPassportisAuthenticatedPath][ApiApiCabloyTestPassportisAuthenticatedMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiCabloyTestPassport extends BeanApiBase {
  isAuthenticated(

    options?: IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiCabloyTestPassportisAuthenticatedResponseBody>(
      ApiApiCabloyTestPassportisAuthenticatedPath,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }
}
