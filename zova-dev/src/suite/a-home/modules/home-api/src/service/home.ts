import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';

/** Home_index */
export const ServiceHomeindexPath = '/';
export type ServiceHomeindexPath = '/';
export type ServiceHomeindexMethod = 'get';

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
