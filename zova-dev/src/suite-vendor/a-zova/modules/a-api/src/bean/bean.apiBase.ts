import type { AxiosRequestConfig } from 'axios';
import type { IApiActionOptions } from '../types/api.js';
import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';

@Virtual()
export class BeanApiBase extends BeanBase {
  $pathTranslate(pathName: string, pathParams?: Record<string, any>): string {
    return this.app.util.apiActionPathTranslate(pathName, pathParams);
  }

  $configPrepare(baseURL?: string, options?: IApiActionOptions): AxiosRequestConfig {
    return this.app.util.apiActionConfigPrepare(baseURL, options);
  }
}
