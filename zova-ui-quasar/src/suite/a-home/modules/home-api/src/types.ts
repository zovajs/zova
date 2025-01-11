import { IModuleService } from './.metadata/index.jsx';
import { BeanFetch } from './bean/bean.api.js';

declare module 'zova' {
  export interface AppMeta {
    $fetch: BeanFetch;
  }
  export interface BeanBase {
    $fetch: BeanFetch;
    $service: IModuleService;
  }
}
