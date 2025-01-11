import { BeanServiceBase, IApiServiceActionOptions, Service } from 'zova-module-a-api';
import { ApiBaseURL, type components, type paths } from './openapi/index.js';

/** Onion_index */
export const ServiceServiceOnionindexPath = '/api/';
export type ServiceServiceOnionindexPath = '/api/';
export type ServiceServiceOnionindexMethod = 'get';
export type ServiceServiceOnionindexResponseBody =
  paths[ServiceServiceOnionindexPath][ServiceServiceOnionindexMethod]['responses']['200']['content']['application/json']['data'];

/** Onion_echo */
export const ServiceServiceOnionechoPath = '/echo';
export type ServiceServiceOnionechoPath = '/echo';
export type ServiceServiceOnionechoMethod = 'post';
export type ServiceServiceOnionechoRequestQuery =
  paths[ServiceServiceOnionechoPath][ServiceServiceOnionechoMethod]['parameters']['query'];
export type ServiceServiceOnionechoRequestBody = {
  /** @description User Id */
  id: number;
};
export type ServiceServiceOnionechoResponseBody =
  paths[ServiceServiceOnionechoPath][ServiceServiceOnionechoMethod]['responses']['200']['content']['application/json']['data'];

/** Onion_echo2 */
export const ServiceServiceOnionecho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}';
export type ServiceServiceOnionecho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}';
export type ServiceServiceOnionecho2Method = 'post';
export type ServiceServiceOnionecho2RequestParams =
  paths[ServiceServiceOnionecho2Path][ServiceServiceOnionecho2Method]['parameters']['path'];
export type ServiceServiceOnionecho2RequestQuery =
  paths[ServiceServiceOnionecho2Path][ServiceServiceOnionecho2Method]['parameters']['query'];
export type ServiceServiceOnionecho2RequestBody = {
  /** @description User Id */
  id: number;
};
export type ServiceServiceOnionecho2ResponseBody =
  paths[ServiceServiceOnionecho2Path][ServiceServiceOnionecho2Method]['responses']['200']['content']['application/json']['data'];

/** Onion_echo3 */
export const ServiceServiceOnionecho3Path = '/api/vona/test/onion/echo3/{userId}';
export type ServiceServiceOnionecho3Path = '/api/vona/test/onion/echo3/{userId}';
export type ServiceServiceOnionecho3Method = 'get';
export type ServiceServiceOnionecho3RequestParams =
  paths[ServiceServiceOnionecho3Path][ServiceServiceOnionecho3Method]['parameters']['path'];
export type ServiceServiceOnionecho3RequestQuery =
  paths[ServiceServiceOnionecho3Path][ServiceServiceOnionecho3Method]['parameters']['query'];
export type ServiceServiceOnionecho3RequestHeaders =
  paths[ServiceServiceOnionecho3Path][ServiceServiceOnionecho3Method]['parameters']['header'];
export type ServiceServiceOnionecho3ResponseBody =
  paths[ServiceServiceOnionecho3Path][ServiceServiceOnionecho3Method]['responses']['200']['content']['application/json']['data'];

/** Onion_echo4 */
export const ServiceServiceOnionecho4Path = '/api/vona/test/onion/echo4';
export type ServiceServiceOnionecho4Path = '/api/vona/test/onion/echo4';
export type ServiceServiceOnionecho4Method = 'post';
export type ServiceServiceOnionecho4RequestBody = components['schemas']['vona-test.dto.user'][];
export type ServiceServiceOnionecho4ResponseBody =
  paths[ServiceServiceOnionecho4Path][ServiceServiceOnionecho4Method]['responses']['200']['content']['application/json']['data'];

/** Onion_echo5 */
export const ServiceServiceOnionecho5Path = '/api/vona/test/onion/echo5';
export type ServiceServiceOnionecho5Path = '/api/vona/test/onion/echo5';
export type ServiceServiceOnionecho5Method = 'get';
export type ServiceServiceOnionecho5RequestQuery =
  paths[ServiceServiceOnionecho5Path][ServiceServiceOnionecho5Method]['parameters']['query'];
export type ServiceServiceOnionecho5ResponseBody =
  paths[ServiceServiceOnionecho5Path][ServiceServiceOnionecho5Method]['responses']['200']['content']['application/json']['data'];

@Service()
export class ServiceOnion extends BeanServiceBase {
  index(options?: IApiServiceActionOptions) {
    return this.$fetch.get<any, ServiceServiceOnionindexResponseBody>(
      ServiceServiceOnionindexPath,
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  echo(
    body: ServiceServiceOnionechoRequestBody,
    options?: {
      query?: ServiceServiceOnionechoRequestQuery;
    } & IApiServiceActionOptions,
  ) {
    return this.$fetch.post<any, ServiceServiceOnionechoResponseBody>(
      ServiceServiceOnionechoPath,
      body,
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  echo2(
    body: ServiceServiceOnionecho2RequestBody,
    options: {
      params: ServiceServiceOnionecho2RequestParams;
      query: ServiceServiceOnionecho2RequestQuery;
    } & IApiServiceActionOptions,
  ) {
    return this.$fetch.post<any, ServiceServiceOnionecho2ResponseBody>(
      this.$pathTranslate(ServiceServiceOnionecho2Path, options.params),
      body,
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  echo3(
    options: {
      params: ServiceServiceOnionecho3RequestParams;
      query?: ServiceServiceOnionecho3RequestQuery;
      headers: ServiceServiceOnionecho3RequestHeaders;
    } & IApiServiceActionOptions,
  ) {
    return this.$fetch.get<any, ServiceServiceOnionecho3ResponseBody>(
      this.$pathTranslate(ServiceServiceOnionecho3Path, options.params),
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  echo4(body?: ServiceServiceOnionecho4RequestBody | undefined, options?: IApiServiceActionOptions) {
    return this.$fetch.post<any, ServiceServiceOnionecho4ResponseBody>(
      ServiceServiceOnionecho4Path,
      body,
      this.$configPrepare(ApiBaseURL, options),
    );
  }

  echo5(
    options?: {
      query?: ServiceServiceOnionecho5RequestQuery;
    } & IApiServiceActionOptions,
  ) {
    return this.$fetch.get<any, ServiceServiceOnionecho5ResponseBody>(
      ServiceServiceOnionecho5Path,
      this.$configPrepare(ApiBaseURL, options),
    );
  }
}
