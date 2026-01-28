import { BeanBase } from 'zova';
import { ApiSchema } from 'zova-module-a-api';
import { ApiApiHomeBasePermissionretrievePermissionsPath } from '../api/homeBasePermission.js';

@ApiSchema()
export class ApiSchemaHomeBasePermission extends BeanBase {
  get retrievePermissions() {
    return this.$sdk.createApiSchemas(ApiApiHomeBasePermissionretrievePermissionsPath, 'get');
  }
}
