/** table */

import { TableIdentity } from 'table-identity';

export interface IResourceActionTableRecord {
  create?: IResourceActionTableOptionsCreate;
  operationsTable?: IResourceActionTableOptionsOperationsTable;
}

export interface IResourceActionTableOptionsBase {
  resource?: string;
}

export interface IResourceActionTableOptionsCreate extends IResourceActionTableOptionsBase {}
export interface IResourceActionTableOptionsOperationsTable extends IResourceActionTableOptionsBase {}

/** row */

export interface IResourceActionRowRecord {
  actionView?: IResourceActionRowOptionsView;
  actionUpdate?: IResourceActionRowOptionsUpdate;
  actionDelete?: IResourceActionRowOptionsDelete;
  actionOperationsRow?: IResourceActionRowOptionsOperationsRow;
}

export interface IResourceActionRowOptionsBase {
  resource?: string;
  id?: TableIdentity;
}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {}
