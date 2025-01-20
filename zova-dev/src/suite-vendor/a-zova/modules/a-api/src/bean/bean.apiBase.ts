import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { IApiActionOptions } from '../types/api.js';
import { AxiosRequestConfig } from 'axios';

@Virtual()
export class BeanApiBase extends BeanBase {
  $pathTranslate(pathName: string, pathParams?: Record<string, any>): string {
    return this.app.util.apiActionPathTranslate(pathName, pathParams);
  }

  $configPrepare(baseURL?: string, options?: IApiActionOptions): AxiosRequestConfig {
    return this.app.util.apiActionConfigPrepare(baseURL, options);
  }
}
