import { BeanBase } from 'zova';
import { ApiSchema } from 'zova-module-a-api';
import { ApiApiHomeBasePermissionretrieveMenusPath } from '../api/homeBasePermission.js';

@ApiSchema()
export class ApiSchemaHomeBasePermission extends BeanBase {
  get retrieveMenus() {
    return this.$sdk.createApiSchemas(ApiApiHomeBasePermissionretrieveMenusPath, 'get');
  }
}
