import 'zova-module-a-openapi';
import { IResourceActionRowOptionsBase, IResourceActionTableOptionsBase } from 'zova-module-a-openapi';

declare module 'zova-module-a-openapi' {
  /** table */
  export interface IResourceActionTableRecord {
    create?: IResourceActionTableOptionsCreate;
    operationsTable?: IResourceActionTableOptionsOperationsTable;
  }

  /** row */
  export interface IResourceActionRowRecord {
    actionView?: IResourceActionRowOptionsView;
    actionUpdate?: IResourceActionRowOptionsUpdate;
    actionDelete?: IResourceActionRowOptionsDelete;
    actionOperationsRow?: IResourceActionRowOptionsOperationsRow;
  }
}

export interface IResourceActionTableOptionsCreate extends IResourceActionTableOptionsBase {}
export interface IResourceActionTableOptionsOperationsTable extends IResourceActionTableOptionsBase {}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {}
