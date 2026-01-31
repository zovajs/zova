import type { IJsxRenderContextBase } from 'zova-module-a-openapi';
import type { IPageWrapperScope } from 'zova-module-rest-resource';
import type { ControllerRestPage } from '../component/restPage/controller.jsx';

import 'zova-module-a-table';

export interface IPageScope extends IPageWrapperScope {}

export interface IJsxRenderContextPage<TData extends {} = {}> extends IJsxRenderContextBase {
  $celScope: IPageScope;
  $$page: ControllerRestPage<TData>;
}

declare module 'zova-module-a-table' {
  export interface ITableCelScope extends IPageScope {}
}
