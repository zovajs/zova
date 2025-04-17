import type { AxiosRequestConfig } from 'axios';
import type { IApiActionOptions } from '../types/api.js';
import { BeanBase, TypeAuthToken } from 'zova';
import { Virtual } from 'zova-module-a-bean';

@Virtual()
export class BeanApiBase extends BeanBase {
  $pathTranslate(pathName: string, pathParams?: Record<string, any>): string {
    return this.sys.util.apiActionPathTranslate(pathName, pathParams);
  }

  $configPrepare(baseURL?: string, options?: IApiActionOptions, authToken?: TypeAuthToken): AxiosRequestConfig {
    return this.sys.util.apiActionConfigPrepare(baseURL, options, authToken);
  }

  $formData(body: object) {
    const formData = new FormData();
    for (const key in body) {
      const value = body[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          formData.append(key, item);
        }
      } else {
        formData.append(key, value);
      }
    }
    return formData;
  }
}
