import 'zova-module-a-openapi';
import type {
  IResourceActionBulkOptionsBase,
  IResourceActionRowOptionsBase,
  IResourceComponentActionBulkOptionsAction,
  IResourceComponentActionRowOptionsAction,
} from 'zova-module-a-openapi';

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsSubmit extends IResourceActionRowOptionsBase {}
export interface IResourceActionRowOptionsBack extends IResourceActionRowOptionsBase {}

export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {
  actions?: IResourceComponentActionBulkOptionsAction[];
}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {
  actions?: IResourceComponentActionRowOptionsAction[];
}

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
    submit?: IResourceActionRowOptionsSubmit;
    back?: IResourceActionRowOptionsBack;
  }

  export interface IResourceComponentActionBulkRecord {
    ActionCreate?: IResourceActionBulkOptionsCreate;
    ActionOperationsBulk?: IResourceActionBulkOptionsOperationsBulk;
  }

  export interface IResourceComponentActionRowRecord {
    ActionView?: IResourceActionRowOptionsView;
    ActionUpdate?: IResourceActionRowOptionsUpdate;
    ActionDelete?: IResourceActionRowOptionsDelete;
    ActionOperationsRow?: IResourceActionRowOptionsOperationsRow;
    ActionSubmit?: IResourceActionRowOptionsSubmit;
    ActionBack?: IResourceActionRowOptionsBack;
  }
}
