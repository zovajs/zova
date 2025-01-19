import { IModuleApi } from './.metadata/index.jsx';

declare module 'zova' {
  export interface BeanBase {
    $api: IModuleApi;
  }
}
