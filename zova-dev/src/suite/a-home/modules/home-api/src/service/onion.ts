import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';
import { IApiServiceActionOptions } from '../types.js';

/** Onion_index */
export const ServiceServiceOnionindexPath = '/api/';
export type ServiceServiceOnionindexPath = '/api/';
export type ServiceServiceOnionindexMethod = 'get';
export type ServiceServiceOnionindexResponseBody =
  paths[ServiceServiceOnionindexPath][ServiceServiceOnionindexMethod]['responses']['200']['content']['application/json']['data'];
/** Onion_echo */
export const ServiceServiceOnionechoPath = '/echo';
export type ServiceServiceOnionechoPath = '/echo';
export type ServiceServiceOnionechoMethod = 'get';
export type ServiceServiceOnionechoRequestQuery =
  paths[ServiceServiceOnionechoPath][ServiceServiceOnionechoMethod]['parameters']['query'];
export type ServiceServiceOnionechoRequestBody =
  paths[ServiceServiceOnionechoPath][ServiceServiceOnionechoMethod]['requestBody']['content']['application/json'];
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
export type ServiceServiceOnionecho2RequestBody =
  paths[ServiceServiceOnionecho2Path][ServiceServiceOnionecho2Method]['requestBody']['content']['application/json'];
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
export type ServiceServiceOnionecho4RequestBody =
  paths[ServiceServiceOnionecho4Path][ServiceServiceOnionecho4Method]['requestBody']['content']['application/json'];
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

export default (app: ZovaApplication) => {
  return {
    index: (options?: IApiServiceActionOptions) =>
      app.meta.$api.post<any, ServiceServiceOnionindexResponseBody>(
        app.util.apiServiceActionPathTranslate(ServiceServiceOnionindexPath, options?.params),

        app.util.apiServiceActionConfig(options),
      ),
    echo: (
      options?: {
        querytrue: ServiceServiceOnionechoRequestQuery;
      } & IApiServiceActionOptions,
    ) =>
      app.meta.$api.post<any, ServiceServiceOnionechoResponseBody>(
        app.util.apiServiceActionPathTranslate(ServiceServiceOnionechoPath, options?.params),

        app.util.apiServiceActionConfig(options),
      ),
    echo2: (
      body: ServiceServiceOnionecho2RequestBody,
      options: {
        paramsfalse: ServiceServiceOnionecho2RequestParams;
        queryfalse: ServiceServiceOnionecho2RequestQuery;
      } & IApiServiceActionOptions,
    ) =>
      app.meta.$api.post<any, ServiceServiceOnionecho2ResponseBody>(
        app.util.apiServiceActionPathTranslate(ServiceServiceOnionecho2Path, options.params),
        body,
        app.util.apiServiceActionConfig(options),
      ),
    echo3: (
      options: {
        paramsfalse: ServiceServiceOnionecho3RequestParams;
        querytrue: ServiceServiceOnionecho3RequestQuery;
        headersfalse: ServiceServiceOnionecho3RequestHeaders;
      } & IApiServiceActionOptions,
    ) =>
      app.meta.$api.post<any, ServiceServiceOnionecho3ResponseBody>(
        app.util.apiServiceActionPathTranslate(ServiceServiceOnionecho3Path, options.params),

        app.util.apiServiceActionConfig(options),
      ),
    echo4: (body?: ServiceServiceOnionecho4RequestBody | undefined, options?: IApiServiceActionOptions) =>
      app.meta.$api.post<any, ServiceServiceOnionecho4ResponseBody>(
        app.util.apiServiceActionPathTranslate(ServiceServiceOnionecho4Path, options?.params),
        body,
        app.util.apiServiceActionConfig(options),
      ),
    echo5: (
      options?: {
        querytrue: ServiceServiceOnionecho5RequestQuery;
      } & IApiServiceActionOptions,
    ) =>
      app.meta.$api.post<any, ServiceServiceOnionecho5ResponseBody>(
        app.util.apiServiceActionPathTranslate(ServiceServiceOnionecho5Path, options?.params),

        app.util.apiServiceActionConfig(options),
      ),
  };
};
