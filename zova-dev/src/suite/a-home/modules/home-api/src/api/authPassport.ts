import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { ApiBaseURL } from './openapi/index.js';

/** AuthPassport_login */
export const ApiApiAuthPassportloginPath = '/api/auth/passport/login/{module}/{providerName}/{clientName?}';
export type ApiApiAuthPassportloginPath = '/api/auth/passport/login/{module}/{providerName}/{clientName?}';
export type ApiApiAuthPassportloginMethod = 'get';
export type ApiApiAuthPassportloginRequestParams = paths[ApiApiAuthPassportloginPath][ApiApiAuthPassportloginMethod]['parameters']['path'];
export type ApiApiAuthPassportloginRequestQuery = paths[ApiApiAuthPassportloginPath][ApiApiAuthPassportloginMethod]['parameters']['query'];
export type ApiApiAuthPassportloginResponseBody = paths[ApiApiAuthPassportloginPath][ApiApiAuthPassportloginMethod]['responses']['200']['content']['application/json']['data'];

/** AuthPassport_associate */
export const ApiApiAuthPassportassociatePath = '/api/auth/passport/associate/{module}/{providerName}/{clientName?}';
export type ApiApiAuthPassportassociatePath = '/api/auth/passport/associate/{module}/{providerName}/{clientName?}';
export type ApiApiAuthPassportassociateMethod = 'get';
export type ApiApiAuthPassportassociateRequestParams = paths[ApiApiAuthPassportassociatePath][ApiApiAuthPassportassociateMethod]['parameters']['path'];
export type ApiApiAuthPassportassociateRequestQuery = paths[ApiApiAuthPassportassociatePath][ApiApiAuthPassportassociateMethod]['parameters']['query'];
export type ApiApiAuthPassportassociateResponseBody = paths[ApiApiAuthPassportassociatePath][ApiApiAuthPassportassociateMethod]['responses']['200']['content']['application/json']['data'];

/** AuthPassport_migrate */
export const ApiApiAuthPassportmigratePath = '/api/auth/passport/migrate/{module}/{providerName}/{clientName?}';
export type ApiApiAuthPassportmigratePath = '/api/auth/passport/migrate/{module}/{providerName}/{clientName?}';
export type ApiApiAuthPassportmigrateMethod = 'get';
export type ApiApiAuthPassportmigrateRequestParams = paths[ApiApiAuthPassportmigratePath][ApiApiAuthPassportmigrateMethod]['parameters']['path'];
export type ApiApiAuthPassportmigrateRequestQuery = paths[ApiApiAuthPassportmigratePath][ApiApiAuthPassportmigrateMethod]['parameters']['query'];
export type ApiApiAuthPassportmigrateResponseBody = paths[ApiApiAuthPassportmigratePath][ApiApiAuthPassportmigrateMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiAuthPassport extends BeanApiBase {
  login(

    options: {
      params: ApiApiAuthPassportloginRequestParams;
      query: ApiApiAuthPassportloginRequestQuery;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiAuthPassportloginResponseBody>(
      this.$pathTranslate(ApiApiAuthPassportloginPath, options.params),
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  associate(

    options: {
      params: ApiApiAuthPassportassociateRequestParams;
      query: ApiApiAuthPassportassociateRequestQuery;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiAuthPassportassociateResponseBody>(
      this.$pathTranslate(ApiApiAuthPassportassociatePath, options.params),
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  migrate(

    options: {
      params: ApiApiAuthPassportmigrateRequestParams;
      query: ApiApiAuthPassportmigrateRequestQuery;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiAuthPassportmigrateResponseBody>(
      this.$pathTranslate(ApiApiAuthPassportmigratePath, options.params),
      this.$configPrepare(ApiBaseURL, options),
    );
  }
}
