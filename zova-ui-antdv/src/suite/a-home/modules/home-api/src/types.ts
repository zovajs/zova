import { IModuleService } from './.metadata/index.js';
import { BeanApi } from './bean/bean.api.js';

declare module 'zova' {
  export interface AppMeta {
    $api: BeanApi;
  }
  export interface BeanBase {
    $api: BeanApi;
    $service: IModuleService;
  }
}
