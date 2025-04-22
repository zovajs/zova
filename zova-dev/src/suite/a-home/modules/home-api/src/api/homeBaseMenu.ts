import type { paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** HomeBaseMenu_retrieveMenus */
export const ApiApiHomeBaseMenuretrieveMenusPath = '/api/home/base/menu';
export type ApiApiHomeBaseMenuretrieveMenusPath = '/api/home/base/menu';
export type ApiApiHomeBaseMenuretrieveMenusMethod = 'get';
export type ApiApiHomeBaseMenuretrieveMenusRequestHeaders = paths[ApiApiHomeBaseMenuretrieveMenusPath][ApiApiHomeBaseMenuretrieveMenusMethod]['parameters']['header'];
export type ApiApiHomeBaseMenuretrieveMenusResponseBody = paths[ApiApiHomeBaseMenuretrieveMenusPath][ApiApiHomeBaseMenuretrieveMenusMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiHomeBaseMenu extends BeanApiBase {
  retrieveMenus(

    options?: {
      headers?: ApiApiHomeBaseMenuretrieveMenusRequestHeaders;
    } & IApiActionOptions,
  ) {
    return this.$fetch.get<any, ApiApiHomeBaseMenuretrieveMenusResponseBody>(
      ApiApiHomeBaseMenuretrieveMenusPath,
      this.$configPrepare(OpenApiBaseURL(this.sys), options, true),
    );
  }
}
