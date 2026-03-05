import { BeanBase } from 'zova';
import { ApiSchema, IApiSchemaFetchOptions } from 'zova-module-a-api';
import { ApiApiHomeBasePermissionretrievePermissionsPath } from '../api/homeBasePermission.js';

@ApiSchema()
export class ApiSchemaHomeBasePermission extends BeanBase {
  retrievePermissions(options?: IApiSchemaFetchOptions) {
    return this.$sdk.createApiSchemas(ApiApiHomeBasePermissionretrievePermissionsPath, 'get', options);
  }
}
