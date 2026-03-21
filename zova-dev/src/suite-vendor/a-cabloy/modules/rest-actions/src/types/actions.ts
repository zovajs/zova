import type { TypeActionProvider } from 'zova-module-a-openapi';

import 'zova-module-a-action';

declare module 'zova-module-a-action' {
  export interface IActionsRecord {
    actionCreate?: TypeActionProvider;
    actionView?: TypeActionProvider;
    actionEdit?: TypeActionProvider;
    actionDelete?: TypeActionProvider;
  }
}
