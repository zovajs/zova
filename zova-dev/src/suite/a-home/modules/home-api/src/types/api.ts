import type { IModuleApi } from '../.metadata/index.js';

declare module 'zova' {
  export interface BeanBase {
    $api: IModuleApi;
  }
}
