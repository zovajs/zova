import 'zova-module-a-openapi';
import type {
  IResourceActionBulkOptionsCreate,
  IResourceActionBulkOptionsOperationsBulk,
  IResourceActionRowOptionsDelete,
  IResourceActionRowOptionsOperationsRow,
  IResourceActionRowOptionsUpdate,
  IResourceActionRowOptionsView,
} from 'zova-module-a-openapi';

declare module 'zova-module-a-openapi' {
  /** table */
  export interface IResourceActionBulkRecord {
    create?: IResourceActionBulkOptionsCreate;
    operationsBulk?: IResourceActionBulkOptionsOperationsBulk;
  }

  /** row */
  export interface IResourceActionRowRecord {
    view?: IResourceActionRowOptionsView;
    update?: IResourceActionRowOptionsUpdate;
    delete?: IResourceActionRowOptionsDelete;
    operationsRow?: IResourceActionRowOptionsOperationsRow;
  }
}
