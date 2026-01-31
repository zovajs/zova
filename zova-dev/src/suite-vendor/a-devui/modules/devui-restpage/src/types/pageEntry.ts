import type { IJsxRenderContextBase } from 'zova-module-a-openapi';
import type { IPageEntryWrapperScope } from 'zova-module-rest-resource';

import type { ControllerRestPageEntry } from '../component/restPageEntry/controller.jsx';
import 'zova-module-a-form';

export interface IPageEntryScope extends IPageEntryWrapperScope {}

export interface IJsxRenderContextPageEntry<TData extends {} = {}> extends IJsxRenderContextBase {
  $celScope: IPageEntryScope;
  $$pageEntry: ControllerRestPageEntry<TData>;
}

declare module 'zova-module-a-form' {
  export interface IFormScope extends IPageEntryScope {}
}
