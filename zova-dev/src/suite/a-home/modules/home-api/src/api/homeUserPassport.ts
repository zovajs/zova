import type { components, paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** HomeUserPassport_current */
export const ApiApiHomeUserPassportcurrentPath = '/api/home/user/passport/current';
export type ApiApiHomeUserPassportcurrentPath = '/api/home/user/passport/current';
export type ApiApiHomeUserPassportcurrentMethod = 'get';
export type ApiApiHomeUserPassportcurrentRequestHeaders = paths[ApiApiHomeUserPassportcurrentPath][ApiApiHomeUserPassportcurrentMethod]['parameters']['header'];
export type ApiApiHomeUserPassportcurrentResponseBody = paths[ApiApiHomeUserPassportcurrentPath][ApiApiHomeUserPassportcurrentMethod]['responses']['200']['content']['application/json']['data'];

/** HomeUserPassport_logout */
export const ApiApiHomeUserPassportlogoutPath = '/api/home/user/passport/logout';
export type ApiApiHomeUserPassportlogoutPath = '/api/home/user/passport/logout';
export type ApiApiHomeUserPassportlogoutMethod = 'post';
export type ApiApiHomeUserPassportlogoutRequestHeaders = paths[ApiApiHomeUserPassportlogoutPath][ApiApiHomeUserPassportlogoutMethod]['parameters']['header'];
export type ApiApiHomeUserPassportlogoutResponseBody = paths[ApiApiHomeUserPassportlogoutPath][ApiApiHomeUserPassportlogoutMethod]['responses']['200']['content']['application/json']['data'];

/** HomeUserPassport_loginSimple */
export const ApiApiHomeUserPassportloginSimplePath = '/api/home/user/passport/login';
export type ApiApiHomeUserPassportloginSimplePath = '/api/home/user/passport/login';
export type ApiApiHomeUserPassportloginSimpleMethod = 'post';
export type ApiApiHomeUserPassportloginSimpleRequestBody = components['schemas']['a-authsimple.dto.authSimple']
;
export type ApiApiHomeUserPassportloginSimpleResponseBody = paths[ApiApiHomeUserPassportloginSimplePath][ApiApiHomeUserPassportloginSimpleMethod]['responses']['200']['content']['application/json']['data'];

/** HomeUserPassport_login */
export const ApiApiHomeUserPassportloginPath = '/api/home/user/passport/login/{module}/{providerName}/{clientName?}';
export type ApiApiHomeUserPassportloginPath = '/api/home/user/passport/login/{module}/{providerName}/{clientName?}';
export type ApiApiHomeUserPassportloginMethod = 'get';
export type ApiApiHomeUserPassportloginRequestParams = paths[ApiApiHomeUserPassportloginPath][ApiApiHomeUserPassportloginMethod]['parameters']['path'];
export type ApiApiHomeUserPassportloginRequestQuery = paths[ApiApiHomeUserPassportloginPath][ApiApiHomeUserPassportloginMethod]['parameters']['query'];
export type ApiApiHomeUserPassportloginResponseBody = paths[ApiApiHomeUserPassportloginPath][ApiApiHomeUserPassportloginMethod]['responses']['200']['content']['application/json']['data'];

/** HomeUserPassport_associate */
export const ApiApiHomeUserPassportassociatePath = '/api/home/user/passport/associate/{module}/{providerName}/{clientName?}';
export type ApiApiHomeUserPassportassociatePath = '/api/home/user/passport/associate/{module}/{providerName}/{clientName?}';
export type ApiApiHomeUserPassportassociateMethod = 'get';
export type ApiApiHomeUserPassportassociateRequestParams = paths[ApiApiHomeUserPassportassociatePath][ApiApiHomeUserPassportassociateMethod]['parameters']['path'];
export type ApiApiHomeUserPassportassociateRequestQuery = paths[ApiApiHomeUserPassportassociatePath][ApiApiHomeUserPassportassociateMethod]['parameters']['query'];
export type ApiApiHomeUserPassportassociateRequestHeaders = paths[ApiApiHomeUserPassportassociatePath][ApiApiHomeUserPassportassociateMethod]['parameters']['header'];
export type ApiApiHomeUserPassportassociateResponseBody = paths[ApiApiHomeUserPassportassociatePath][ApiApiHomeUserPassportassociateMethod]['responses']['200']['content']['application/json']['data'];

/** HomeUserPassport_migrate */
export const ApiApiHomeUserPassportmigratePath = '/api/home/user/passport/migrate/{module}/{providerName}/{clientName?}';
export type ApiApiHomeUserPassportmigratePath = '/api/home/user/passport/migrate/{module}/{providerName}/{clientName?}';
export type ApiApiHomeUserPassportmigrateMethod = 'get';
export type ApiApiHomeUserPassportmigrateRequestParams = paths[ApiApiHomeUserPassportmigratePath][ApiApiHomeUserPassportmigrateMethod]['parameters']['path'];
export type ApiApiHomeUserPassportmigrateRequestQuery = paths[ApiApiHomeUserPassportmigratePath][ApiApiHomeUserPassportmigrateMethod]['parameters']['query'];
export type ApiApiHomeUserPassportmigrateRequestHeaders = paths[ApiApiHomeUserPassportmigratePath][ApiApiHomeUserPassportmigrateMethod]['parameters']['header'];
export type ApiApiHomeUserPassportmigrateResponseBody = paths[ApiApiHomeUserPassportmigratePath][ApiApiHomeUserPassportmigrateMethod]['responses']['200']['content']['application/json']['data'];

/** HomeUserPassport_refreshAuthToken */
export const ApiApiHomeUserPassportrefreshAuthTokenPath = '/api/home/user/passport/refreshAuthToken';
export type ApiApiHomeUserPassportrefreshAuthTokenPath = '/api/home/user/passport/refreshAuthToken';
export type ApiApiHomeUserPassportrefreshAuthTokenMethod = 'post';
export interface ApiApiHomeUserPassportrefreshAuthTokenRequestBody {
  refreshToken: string;
}
export type ApiApiHomeUserPassportrefreshAuthTokenResponseBody = paths[ApiApiHomeUserPassportrefreshAuthTokenPath][ApiApiHomeUserPassportrefreshAuthTokenMethod]['responses']['200']['content']['application/json']['data'];

/** HomeUserPassport_createPassportJwtFromOauthCode */
export const ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath = '/api/home/user/passport/createPassportJwtFromOauthCode';
export type ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath = '/api/home/user/passport/createPassportJwtFromOauthCode';
export type ApiApiHomeUserPassportcreatePassportJwtFromOauthCodeMethod = 'post';
export interface ApiApiHomeUserPassportcreatePassportJwtFromOauthCodeRequestBody {
  code: string;
}
export type ApiApiHomeUserPassportcreatePassportJwtFromOauthCodeResponseBody = paths[ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath][ApiApiHomeUserPassportcreatePassportJwtFromOauthCodeMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiHomeUserPassport extends BeanApiBase {
  current(

    options?: {
      headers?: ApiApiHomeUserPassportcurrentRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiHomeUserPassportcurrentResponseBody>(
      ApiApiHomeUserPassportcurrentPath,
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }

  logout(
    body?: undefined,
    options?: {
      headers?: ApiApiHomeUserPassportlogoutRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiHomeUserPassportlogoutResponseBody>(
      ApiApiHomeUserPassportlogoutPath,
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }

  loginSimple(
    body: ApiApiHomeUserPassportloginSimpleRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiHomeUserPassportloginSimpleResponseBody>(
      ApiApiHomeUserPassportloginSimplePath,
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  login(

    options: {
      params: ApiApiHomeUserPassportloginRequestParams;
      query?: ApiApiHomeUserPassportloginRequestQuery;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiHomeUserPassportloginResponseBody>(
      this.$pathTranslate(ApiApiHomeUserPassportloginPath, options.params),
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  associate(

    options: {
      params: ApiApiHomeUserPassportassociateRequestParams;
      query?: ApiApiHomeUserPassportassociateRequestQuery;
      headers?: ApiApiHomeUserPassportassociateRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiHomeUserPassportassociateResponseBody>(
      this.$pathTranslate(ApiApiHomeUserPassportassociatePath, options.params),
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }

  migrate(

    options: {
      params: ApiApiHomeUserPassportmigrateRequestParams;
      query?: ApiApiHomeUserPassportmigrateRequestQuery;
      headers?: ApiApiHomeUserPassportmigrateRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiHomeUserPassportmigrateResponseBody>(
      this.$pathTranslate(ApiApiHomeUserPassportmigratePath, options.params),
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }

  refreshAuthToken(
    body: ApiApiHomeUserPassportrefreshAuthTokenRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiHomeUserPassportrefreshAuthTokenResponseBody>(
      ApiApiHomeUserPassportrefreshAuthTokenPath,
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  createPassportJwtFromOauthCode(
    body: ApiApiHomeUserPassportcreatePassportJwtFromOauthCodeRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiHomeUserPassportcreatePassportJwtFromOauthCodeResponseBody>(
      ApiApiHomeUserPassportcreatePassportJwtFromOauthCodePath,
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }
}
