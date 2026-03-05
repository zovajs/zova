import { BeanBase } from 'zova';
import { ApiSchema, IApiSchemaFetchOptions } from 'zova-module-a-api';
import { ApiApiHomeBaseMenuretrieveMenusPath } from '../api/homeBaseMenu.js';

@ApiSchema()
export class ApiSchemaHomeBaseMenu extends BeanBase {
  retrieveMenus(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeBaseMenuretrieveMenusPath, 'get', options);
  }
}
