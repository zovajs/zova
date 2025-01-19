import { OmitNever, PowerPartial } from 'zova';
import {
  IOnionItem,
  IOnionOptionsDeps,
  IOnionOptionsEnable,
  IOnionOptionsMatch,
  ServiceOnion,
} from 'zova-module-a-bean';
import { BeanFetch } from '../bean/bean.fetch.js';
import { AxiosError, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';

export type NextInterceptorRequest = (config?: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
export type NextInterceptorResponse = (response?: AxiosResponse) => Promise<AxiosResponse>;
export type NextInterceptorError = (error?: AxiosError) => Promise<AxiosError>;

export interface IBeanFetchOptions {
  axiosConfig?: CreateAxiosDefaults;
  onionItems?:
    | IOnionItem<IDecoratorInterceptorOptions, keyof IInterceptorRecord>
    | IOnionItem<IDecoratorInterceptorOptions, keyof IInterceptorRecord>[];
}

export interface IInterceptorRecord {}

export interface IDecoratorInterceptorOptions
  extends IOnionOptionsEnable,
    IOnionOptionsMatch<string>,
    IOnionOptionsDeps<keyof IInterceptorRecord> {}

declare module 'zova-module-a-bean' {
  export interface BeanOnion {
    interceptor: ServiceOnion<IDecoratorInterceptorOptions, keyof IInterceptorRecord>;
  }
}

declare module 'zova' {
  export interface ConfigOnions {
    interceptor: OmitNever<IInterceptorRecord>;
  }

  export interface IBeanSceneRecord {
    interceptor: never;
  }
}

declare module 'zova' {
  export interface AppMeta {
    $fetch: BeanFetch;
  }
  export interface BeanBase {
    $fetch: BeanFetch;
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    interceptorsDynamic?: PowerPartial<IInterceptorRecord>;
  }
}
