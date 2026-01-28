import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** HomeBasePermission_retrieveMenus */
export const ApiApiHomeBasePermissionretrieveMenusPath = '/api/home/base/permission/{resource}';
export type ApiApiHomeBasePermissionretrieveMenusPath = '/api/home/base/permission/{resource}';
export type ApiApiHomeBasePermissionretrieveMenusMethod = 'get';
export type ApiApiHomeBasePermissionretrieveMenusRequestParams = paths[ApiApiHomeBasePermissionretrieveMenusPath][ApiApiHomeBasePermissionretrieveMenusMethod]['parameters']['path'];
export type ApiApiHomeBasePermissionretrieveMenusResponseBody = paths[ApiApiHomeBasePermissionretrieveMenusPath][ApiApiHomeBasePermissionretrieveMenusMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiHomeBasePermission extends BeanApiBase {
  retrieveMenus(

    options: {
      params: ApiApiHomeBasePermissionretrieveMenusRequestParams;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiHomeBasePermissionretrieveMenusResponseBody>(
      this.$pathTranslate(ApiApiHomeBasePermissionretrieveMenusPath, options.params),
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }
}
