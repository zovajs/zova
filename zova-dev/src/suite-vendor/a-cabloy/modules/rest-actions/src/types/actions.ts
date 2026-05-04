import type { TypeActionProvider } from 'zova-module-a-openapi';

import 'zova-module-a-action';
import { TableIdentity } from 'table-identity';
import { IDecoratorActionOptions } from 'zova-module-a-action';

declare module 'zova-module-a-action' {
  export interface IActionsRecord {
    ActionCreate?: TypeActionProvider;
    ActionView?: TypeActionProvider;
    ActionEdit?: TypeActionProvider;
    ActionDelete?: TypeActionProvider;
  }
}

export interface IActionOptionsRowBase<Result = any> extends IDecoratorActionOptions<Result> {
  resource?: string;
  id?: TableIdentity;
}

export interface IActionOptionsBulkBase<Result = any> extends IDecoratorActionOptions<Result> {
  resource?: string;
}
