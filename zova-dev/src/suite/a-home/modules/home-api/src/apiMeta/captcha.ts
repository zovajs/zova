import { BeanBase } from 'zova';
import { ApiMeta } from 'zova-module-a-api';
import { ApiApiCaptchacreatePath, ApiApiCaptcharefreshPath, ApiApiCaptchaverifyImmediatePath } from '../api/captcha.js';

@ApiMeta()
export class ApiMetaCaptcha extends BeanBase {
  get create() {
    return [ApiApiCaptchacreatePath, 'post'];
  }

  get refresh() {
    return [ApiApiCaptcharefreshPath, 'post'];
  }

  get verifyImmediate() {
    return [ApiApiCaptchaverifyImmediatePath, 'post'];
  }
}
