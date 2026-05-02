import type { IPageEntryScope } from 'zova-module-a-openapi';

import type { ControllerRestPageEntry } from '../component/restPageEntry/controller.jsx';
import 'zova-module-a-form';
import 'zova-module-a-openapi';

declare module 'zova-module-a-openapi' {
  export interface IJsxRenderContextPageEntry<TData extends {} = {}> {
    $$pageEntry: ControllerRestPageEntry<TData>;
  }
}

declare module 'zova-module-a-form' {
  export interface IFormScope extends IPageEntryScope {}
}
