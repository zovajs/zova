import { IModuleApi } from './.metadata/index.jsx';
import { BeanFetch } from './bean/bean.fetch.js';

declare module 'zova' {
  export interface AppMeta {
    $fetch: BeanFetch;
  }
  export interface BeanBase {
    $fetch: BeanFetch;
    $service: IModuleApi;
  }
}
