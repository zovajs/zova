import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { ApiBaseURL } from './openapi/index.js';

/** UserPassport_refreshAuthToken */
export const ApiApiUserPassportrefreshAuthTokenPath = '/api/user/passport/refreshAuthToken';
export type ApiApiUserPassportrefreshAuthTokenPath = '/api/user/passport/refreshAuthToken';
export type ApiApiUserPassportrefreshAuthTokenMethod = 'post';
export interface ApiApiUserPassportrefreshAuthTokenRequestBody {
  refreshToken: string;
}
export type ApiApiUserPassportrefreshAuthTokenResponseBody = paths[ApiApiUserPassportrefreshAuthTokenPath][ApiApiUserPassportrefreshAuthTokenMethod]['responses']['200']['content']['application/json']['data'];

/** UserPassport_createAuthTokenFromOauthCode */
export const ApiApiUserPassportcreateAuthTokenFromOauthCodePath = '/api/user/passport/createAuthTokenFromOauthCode';
export type ApiApiUserPassportcreateAuthTokenFromOauthCodePath = '/api/user/passport/createAuthTokenFromOauthCode';
export type ApiApiUserPassportcreateAuthTokenFromOauthCodeMethod = 'post';
export interface ApiApiUserPassportcreateAuthTokenFromOauthCodeRequestBody {
  code: string;
}
export type ApiApiUserPassportcreateAuthTokenFromOauthCodeResponseBody = paths[ApiApiUserPassportcreateAuthTokenFromOauthCodePath][ApiApiUserPassportcreateAuthTokenFromOauthCodeMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiUserPassport extends BeanApiBase {
  refreshAuthToken(
    body: ApiApiUserPassportrefreshAuthTokenRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiUserPassportrefreshAuthTokenResponseBody>(
      ApiApiUserPassportrefreshAuthTokenPath,
      body,
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  createAuthTokenFromOauthCode(
    body: ApiApiUserPassportcreateAuthTokenFromOauthCodeRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiUserPassportcreateAuthTokenFromOauthCodeResponseBody>(
      ApiApiUserPassportcreateAuthTokenFromOauthCodePath,
      body,
      this.$configPrepare(ApiBaseURL, options),
    );
  }
}
