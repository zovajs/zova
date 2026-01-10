import { BeanBase } from 'zova';
import { ApiMeta } from 'zova-module-a-api';
import { ApiApiTestVonaCaptchasigninPath } from '../api/testVonaCaptcha.js';

@ApiMeta()
export class ApiMetaTestVonaCaptcha extends BeanBase {
  get signin() {
    return [ApiApiTestVonaCaptchasigninPath, 'post'];
  }
}
