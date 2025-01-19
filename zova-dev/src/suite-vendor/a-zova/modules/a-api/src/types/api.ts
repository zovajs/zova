import { PowerPartial } from 'zova';
import { IInterceptorRecord } from 'zova-module-a-fetch';

export interface IApiActionOptions {
  interceptors?: PowerPartial<IInterceptorRecord>;
}

declare module 'zova' {
  export interface IBeanSceneRecord {
    api: never;
  }
}
