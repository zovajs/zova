import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';
import { IApiServiceActionOptions } from '../types.js';

/** Home_index */
export const ServiceServiceHomeindexPath = '/';
export type ServiceServiceHomeindexPath = '/';
export type ServiceServiceHomeindexMethod = 'get';
export type ServiceServiceHomeindexResponseBody =
  paths[ServiceServiceHomeindexPath][ServiceServiceHomeindexMethod]['responses']['200']['content']['application/json']['data'];

export default (app: ZovaApplication) => {
  return {
    index: (optionstrue: IApiServiceActionOptions) =>
      app.meta.$api.post<any, ServiceServiceHomeindexResponseBody>(
        app.util.apiServiceActionPathTranslate(ServiceServiceHomeindexPath, optionstrue.params),

        app.util.apiServiceActionConfig(options),
      ),
  };
};
