import { Service } from 'zova';
import { BeanServiceBase, IApiServiceActionOptions } from 'zova-module-a-api';
import type { paths } from './openapi/index.js';

/** Home_index */
export const ServiceServiceHomeindexPath = '/';
export type ServiceServiceHomeindexPath = '/';
export type ServiceServiceHomeindexMethod = 'get';
export type ServiceServiceHomeindexResponseBody =
  paths[ServiceServiceHomeindexPath][ServiceServiceHomeindexMethod]['responses']['200']['content']['application/json']['data'];

@Service()
export class ServiceHome extends BeanServiceBase {
  /** @description Home */
  index(options?: IApiServiceActionOptions) {
    return this.$api.get<any, ServiceServiceHomeindexResponseBody>(
      ServiceServiceHomeindexPath,
      this.$configPrepare(options),
    );
  }
}
