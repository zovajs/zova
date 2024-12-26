import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';

/** Home_index */
export const ServiceServiceHomeindexPath = '/';
export type ServiceServiceHomeindexPath = '/';
export type ServiceServiceHomeindexMethod = 'get';

export default (app: ZovaApplication) => {
  return {
    index: () =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
  };
};
