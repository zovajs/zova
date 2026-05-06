import 'zova-module-a-openapi';
import type { IResourceActionBulkOptionsBase } from 'zova-module-a-openapi';

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

declare module 'zova-module-a-openapi' {
  export interface IResourceActionBulkRecord {
    create?: IResourceActionBulkOptionsCreate;
  }

  export interface IResourceComponentActionBulkRecord {
    ActionCreate?: IResourceActionBulkOptionsCreate;
  }
}
