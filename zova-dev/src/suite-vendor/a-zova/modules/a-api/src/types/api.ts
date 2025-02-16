import type { AxiosRequestConfig } from 'axios';
import type { PowerPartial } from 'zova';
import type { IInterceptorRecord } from 'zova-module-a-fetch';

export interface IApiActionOptions extends AxiosRequestConfig {
  interceptors?: PowerPartial<IInterceptorRecord>;
}

declare module 'zova' {
  export interface IBeanSceneRecord {
    api: never;
  }
}
