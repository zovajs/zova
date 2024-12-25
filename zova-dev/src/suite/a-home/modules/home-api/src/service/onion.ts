import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';

export const ServiceOnionEcho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}';
export type ServiceOnionEcho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}';
export type ServiceOnionEcho2Method = 'post';
export type ServiceOnionEcho2RequestParams =
  paths[ServiceOnionEcho2Path][ServiceOnionEcho2Method]['parameters']['path'];
export type ServiceOnionEcho2RequestQuery =
  paths[ServiceOnionEcho2Path][ServiceOnionEcho2Method]['parameters']['query'];
export type ServiceOnionEcho2RequestHeaders =
  paths[ServiceOnionEcho2Path][ServiceOnionEcho2Method]['parameters']['header'];
export type ServiceOnionEcho2RequestBody =
  paths[ServiceOnionEcho2Path][ServiceOnionEcho2Method]['requestBody']['content']['application/json'];
export type ServiceOnionEcho2ResponseBody =
  paths[ServiceOnionEcho2Path][ServiceOnionEcho2Method]['responses']['200']['content']['application/json']['data'];

export default (app: ZovaApplication) => {
  return {
    /**
     * @description Home
     * @summury Home2
     */
    echo2: (
      body: ServiceOnionEcho2RequestBody,
      options?: {
        params?: ServiceOnionEcho2RequestParams;
        query?: ServiceOnionEcho2RequestQuery;
        headers?: ServiceOnionEcho2RequestHeaders;
      },
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
  };
};
