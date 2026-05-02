import type { IPageScope } from 'zova-module-a-openapi';

import type { ControllerRestPage } from '../component/restPage/controller.jsx';
import 'zova-module-a-table';
import 'zova-module-a-openapi';

declare module 'zova-module-a-openapi' {
  export interface IJsxRenderContextPage<TData extends {} = {}> {
    $$page: ControllerRestPage<TData>;
  }
}

declare module 'zova-module-a-table' {
  export interface ITableScope extends IPageScope {}
}
