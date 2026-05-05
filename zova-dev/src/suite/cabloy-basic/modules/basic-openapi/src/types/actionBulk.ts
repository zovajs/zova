import 'zova-module-a-openapi';
import type { IResourceActionBulkOptionsBase, IResourceComponentActionBulkOptionsAction } from 'zova-module-a-openapi';

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {
  actions?: IResourceComponentActionBulkOptionsAction[];
}

declare module 'zova-module-a-openapi' {
  export interface IResourceActionBulkRecord {
    create?: IResourceActionBulkOptionsCreate;
    operationsBulk?: IResourceActionBulkOptionsOperationsBulk;
  }

  export interface IResourceComponentActionBulkRecord {
    ActionCreate?: IResourceActionBulkOptionsCreate;
    ActionOperationsBulk?: IResourceActionBulkOptionsOperationsBulk;
  }
}
