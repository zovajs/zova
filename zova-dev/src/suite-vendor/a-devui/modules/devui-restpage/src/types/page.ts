import type { IJsxRenderContextBase } from 'zova-module-a-openapi';
import type { IPageWrapperScope } from 'zova-module-rest-resource';
import type { ControllerRestPage } from '../component/restPage/controller.jsx';

export interface IPageScope extends IPageWrapperScope {}

export interface IJsxRenderContextPage<TData extends {} = {}> extends IJsxRenderContextBase {
  $celScope: IPageScope;
  $$page: ControllerRestPage<TData>;
}

// need not extend ITableCelScope
// import 'zova-module-a-table';

// declare module 'zova-module-a-table' {
//   export interface ITableCelScope extends IPageScope {}
// }
