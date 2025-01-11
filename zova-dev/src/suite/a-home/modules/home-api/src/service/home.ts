import { BeanServiceBase, IApiServiceActionOptions, Service } from 'zova-module-a-api';
import { ApiBaseURL, type paths } from './openapi/index.js';

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
    return this.$fetch.get<any, ServiceServiceHomeindexResponseBody>(
      ServiceServiceHomeindexPath,
      this.$configPrepare(ApiBaseURL, options),
    );
  }
}
