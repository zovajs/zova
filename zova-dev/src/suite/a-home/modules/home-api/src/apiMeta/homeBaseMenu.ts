import { BeanBase } from 'zova';
import { ApiMeta } from 'zova-module-a-api';
import { ApiApiHomeBaseMenuretrieveMenusPath } from '../api/homeBaseMenu.js';

@ApiMeta()
export class ApiMetaHomeBaseMenu extends BeanBase {
  get retrieveMenus() {
    return [ApiApiHomeBaseMenuretrieveMenusPath, 'get'];
  }
}
