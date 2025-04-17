import type { components, paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** Onion_index */
export const ApiApiOnionindexPath = '/api/';
export type ApiApiOnionindexPath = '/api/';
export type ApiApiOnionindexMethod = 'get';
export type ApiApiOnionindexResponseBody = paths[ApiApiOnionindexPath][ApiApiOnionindexMethod]['responses']['200']['content']['application/json']['data'];

/** Onion_echo */
export const ApiApiOnionechoPath = '/echo';
export type ApiApiOnionechoPath = '/echo';
export type ApiApiOnionechoMethod = 'post';
export type ApiApiOnionechoRequestQuery = paths[ApiApiOnionechoPath][ApiApiOnionechoMethod]['parameters']['query'];
export interface ApiApiOnionechoRequestBody {
  /** @description User Id */
  id: number;
}
export type ApiApiOnionechoResponseBody = paths[ApiApiOnionechoPath][ApiApiOnionechoMethod]['responses']['200']['content']['application/json']['data'];

/** Onion_echo2 */
export const ApiApiOnionecho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}';
export type ApiApiOnionecho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}';
export type ApiApiOnionecho2Method = 'post';
export type ApiApiOnionecho2RequestParams = paths[ApiApiOnionecho2Path][ApiApiOnionecho2Method]['parameters']['path'];
export type ApiApiOnionecho2RequestQuery = paths[ApiApiOnionecho2Path][ApiApiOnionecho2Method]['parameters']['query'];
export interface ApiApiOnionecho2RequestBody {
  /** @description User Id */
  id: number;
}
export type ApiApiOnionecho2ResponseBody = paths[ApiApiOnionecho2Path][ApiApiOnionecho2Method]['responses']['200']['content']['application/json']['data'];

/** Onion_echo3 */
export const ApiApiOnionecho3Path = '/api/vona/test/onion/echo3/{userId}';
export type ApiApiOnionecho3Path = '/api/vona/test/onion/echo3/{userId}';
export type ApiApiOnionecho3Method = 'get';
export type ApiApiOnionecho3RequestParams = paths[ApiApiOnionecho3Path][ApiApiOnionecho3Method]['parameters']['path'];
export type ApiApiOnionecho3RequestQuery = paths[ApiApiOnionecho3Path][ApiApiOnionecho3Method]['parameters']['query'];
export type ApiApiOnionecho3RequestHeaders = paths[ApiApiOnionecho3Path][ApiApiOnionecho3Method]['parameters']['header'];
export type ApiApiOnionecho3ResponseBody = paths[ApiApiOnionecho3Path][ApiApiOnionecho3Method]['responses']['200']['content']['application/json']['data'];

/** Onion_echo4 */
export const ApiApiOnionecho4Path = '/api/vona/test/onion/echo4';
export type ApiApiOnionecho4Path = '/api/vona/test/onion/echo4';
export type ApiApiOnionecho4Method = 'post';
export type ApiApiOnionecho4RequestBody = components['schemas']['vona-test.dto.user'][]
;
export type ApiApiOnionecho4ResponseBody = paths[ApiApiOnionecho4Path][ApiApiOnionecho4Method]['responses']['200']['content']['application/json']['data'];

/** Onion_echo5 */
export const ApiApiOnionecho5Path = '/api/vona/test/onion/echo5';
export type ApiApiOnionecho5Path = '/api/vona/test/onion/echo5';
export type ApiApiOnionecho5Method = 'get';
export type ApiApiOnionecho5RequestQuery = paths[ApiApiOnionecho5Path][ApiApiOnionecho5Method]['parameters']['query'];
export type ApiApiOnionecho5ResponseBody = paths[ApiApiOnionecho5Path][ApiApiOnionecho5Method]['responses']['200']['content']['application/json']['data'];

/** Onion_echo6 */
export const ApiApiOnionecho6Path = '/api/vona/test/onion/echo6';
export type ApiApiOnionecho6Path = '/api/vona/test/onion/echo6';
export type ApiApiOnionecho6Method = 'get';
export type ApiApiOnionecho6RequestHeaders = paths[ApiApiOnionecho6Path][ApiApiOnionecho6Method]['parameters']['header'];
export type ApiApiOnionecho6ResponseBody = paths[ApiApiOnionecho6Path][ApiApiOnionecho6Method]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiOnion extends BeanApiBase {
  index(

    options?: IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiOnionindexResponseBody>(
      ApiApiOnionindexPath,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  echo(
    body: ApiApiOnionechoRequestBody,
    options?: {
      query?: ApiApiOnionechoRequestQuery;
    } & IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiOnionechoResponseBody>(
      ApiApiOnionechoPath,
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  echo2(
    body: ApiApiOnionecho2RequestBody,
    options: {
      params: ApiApiOnionecho2RequestParams;
      query: ApiApiOnionecho2RequestQuery;
    } & IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiOnionecho2ResponseBody>(
      this.$pathTranslate(ApiApiOnionecho2Path, options.params),
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  echo3(

    options: {
      params: ApiApiOnionecho3RequestParams;
      query?: ApiApiOnionecho3RequestQuery;
      headers: ApiApiOnionecho3RequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiOnionecho3ResponseBody>(
      this.$pathTranslate(ApiApiOnionecho3Path, options.params),
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  echo4(
    body?: ApiApiOnionecho4RequestBody | undefined,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiOnionecho4ResponseBody>(
      ApiApiOnionecho4Path,
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  echo5(

    options?: {
      query?: ApiApiOnionecho5RequestQuery;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiOnionecho5ResponseBody>(
      ApiApiOnionecho5Path,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }

  echo6(

    options?: {
      headers?: ApiApiOnionecho6RequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiOnionecho6ResponseBody>(
      ApiApiOnionecho6Path,
      this.$configPrepare(OpenApiBaseURL(this.sys), options),
    );
  }
}
