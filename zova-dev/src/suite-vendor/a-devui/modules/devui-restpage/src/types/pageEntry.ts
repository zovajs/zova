import type { IJsxRenderContextBase } from 'zova-module-a-openapi';
import type { IPageEntryWrapperScope } from 'zova-module-rest-resource';
import type { ControllerRestPage } from '../component/restPage/controller.jsx';

import 'zova-module-a-form';

export interface IPageEntryScope extends IPageEntryWrapperScope {}

export interface IJsxRenderContextPageEntry<TData extends {} = {}> extends IJsxRenderContextBase {
  $celScope: IPageEntryScope;
  $$pageEntry: ControllerRestPage<TData>;
}

declare module 'zova-module-a-form' {
  export interface IFormCelScope extends IPageEntryScope {}
}
