import { OmitNever } from 'zova';
import {
  IOnionItem,
  IOnionOptionsDeps,
  IOnionOptionsEnable,
  IOnionOptionsMatch,
  ServiceOnion,
} from 'zova-module-a-bean';
import { BeanFetch } from '../bean/bean.fetch.js';
import { CreateAxiosDefaults } from 'axios';

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
