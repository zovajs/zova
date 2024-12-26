import { TypeModuleServices } from 'zova';
import { services } from './.metadata/index.js';
import { BeanApi } from './bean/bean.api.js';

export interface IApiServiceActionOptions {}

declare module 'zova' {
  export interface AppMeta {
    $api: BeanApi;
  }
  export interface BeanBase {
    $api: BeanApi;
    $service: TypeModuleServices<typeof services>;
  }
}
