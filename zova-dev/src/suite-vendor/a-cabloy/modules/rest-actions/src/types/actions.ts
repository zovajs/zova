import type { TypeActionProvider } from 'zova-module-a-openapi';
import type { IPageWrapperScope } from 'zova-module-rest-resource';

import 'zova-module-a-action';

declare module 'zova-module-a-action' {
  export interface IActionsRecord {
    actionCreate?: TypeActionProvider;
    actionView?: TypeActionProvider;
    actionEdit?: TypeActionProvider;
    actionDelete?: TypeActionProvider;
  }
}

declare module 'zova-module-a-table' {
  export interface ITableScope extends IPageWrapperScope {}
}
