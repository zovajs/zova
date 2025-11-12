import type { components, paths } from './openapi/index.js';
import { Api, BeanApiBase, IApiActionOptions } from 'zova-module-a-api';
import { OpenApiBaseURL } from './openapi/index.js';

/** TestVonaCaptcha_signin */
export const ApiApiTestVonaCaptchasigninPath = '/api/test/vona/captcha/signin';
export type ApiApiTestVonaCaptchasigninPath = '/api/test/vona/captcha/signin';
export type ApiApiTestVonaCaptchasigninMethod = 'post';
export type ApiApiTestVonaCaptchasigninRequestBody = components['schemas']['test-vona.dto.signin']
;
export type ApiApiTestVonaCaptchasigninResponseBody = paths[ApiApiTestVonaCaptchasigninPath][ApiApiTestVonaCaptchasigninMethod]['responses']['200']['content']['application/json']['data'];

@Api()
export class ApiTestVonaCaptcha extends BeanApiBase {
  signin(
    body: ApiApiTestVonaCaptchasigninRequestBody,
    options?: IApiActionOptions,
  ) {
    return this.$fetch.post<any, ApiApiTestVonaCaptchasigninResponseBody>(
      ApiApiTestVonaCaptchasigninPath,
      body,
      this.$configPrepare(OpenApiBaseURL(this.sys), options, false),
    );
  }
}
