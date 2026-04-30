import 'zova-module-a-openapi';
import type {
  IResourceActionRowOptionsBase,
  IResourceActionRowRecord,
  IResourceActionTableOptionsBase,
  ISchemaObjectExtensionFieldRestTable,
} from 'zova-module-a-openapi';

declare module 'zova-module-a-openapi' {
  /** table */
  export interface IResourceActionTableRecord {
    create?: never;
    operationsBulk?: never;
  }

  /** row */
  export interface IResourceActionRowRecord {
    view?: never;
    update?: never;
    delete?: never;
    operationsRow?: never;
  }
}

export interface IResourceActionComponentTableRecord {
  actionCreate?: IResourceActionTableOptionsCreate;
  actionOperationsBulk?: IResourceActionTableOptionsOperationsBulk;
}

export interface IResourceActionComponentRowRecord {
  actionView?: IResourceActionRowOptionsView;
  actionUpdate?: IResourceActionRowOptionsUpdate;
  actionDelete?: IResourceActionRowOptionsDelete;
  actionOperationsRow?: IResourceActionRowOptionsOperationsRow;
}

export interface IResourceActionTableOptionsCreate extends IResourceActionTableOptionsBase {}
export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {
  actions?: TypeResourceActionRowOptionsOperationsRowActions;
}

export type TypeResourceActionRowOptionsOperationsRowActions = {
  [key in keyof Omit<IResourceActionRowRecord, 'operationsRow'>]?: ISchemaObjectExtensionFieldRestTable | false;
};
