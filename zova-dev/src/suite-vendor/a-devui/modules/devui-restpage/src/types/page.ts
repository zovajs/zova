import type { IFormCelScope } from 'zova-module-a-form';
import type { IJsxRenderContextBase } from 'zova-module-a-openapi';
import type { IPageWrapperScope } from 'zova-module-rest-resource';
import type { ControllerRestPage } from '../component/restPage/controller.jsx';
import type { ControllerRestPageEntry } from '../component/restPageEntry/controller.jsx';

export interface IPageScope extends IPageWrapperScope {}

export interface IJsxRenderContextPage<TData extends {} = {}> extends IJsxRenderContextBase {
  $celScope: IPageScope;
  $$page: ControllerRestPage<TData>;
}

export interface IJsxRenderContextPageEntry extends IJsxRenderContextBase {
  $celScope: IFormCelScope;
  $$pageEntry: ControllerRestPageEntry;
}

// need not extend ITableCelScope
// import 'zova-module-a-table';

// declare module 'zova-module-a-table' {
//   export interface ITableCelScope extends IPageScope {}
// }
