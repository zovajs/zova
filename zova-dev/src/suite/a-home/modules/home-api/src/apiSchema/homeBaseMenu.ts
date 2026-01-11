import { ApiSchema } from 'zova-module-a-api';
import { BeanApiSchemaBase } from 'zova-module-a-openapi';
import { ApiApiHomeBaseMenuretrieveMenusPath } from '../api/homeBaseMenu.js';

@ApiSchema()
export class ApiSchemaHomeBaseMenu extends BeanApiSchemaBase {
  get retrieveMenus() {
    return this.$createApiSchemas(ApiApiHomeBaseMenuretrieveMenusPath, 'get');
  }
}
