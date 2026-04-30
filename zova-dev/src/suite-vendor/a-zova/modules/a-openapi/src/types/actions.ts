import { TableIdentity } from 'table-identity';

import { ISchemaObjectExtensionFieldRest } from './rest.js';

export interface IResourceComponentFormFieldRecord {}

export interface IResourceActionBulkRecord {}

export interface IResourceActionRowRecord {}

export interface IResourceActionTableRecord extends IResourceActionBulkRecord, IResourceActionRowRecord {}

export type IResourceComponentActionBulkRecord = {
  [key in keyof IResourceActionBulkRecord as `action${Capitalize<key>}`]: IResourceActionBulkRecord[key];
};

export type IResourceComponentActionRowRecord = {
  [key in keyof IResourceActionRowRecord as `action${Capitalize<key>}`]: IResourceActionRowRecord[key];
};

export interface IResourceActionBulkOptionsBase {
  resource?: string;
}

export interface IResourceActionRowOptionsBase {
  resource?: string;
  id?: TableIdentity;
  class?: any;
}

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {
  actions?: IResourceActionBulkOptionsOperationsBulkAction[];
}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {
  actions?: IResourceActionRowOptionsOperationsRowAction[];
}

export interface IResourceActionBulkOptionsOperationsBulkAction {
  name: keyof Omit<IResourceActionBulkRecord, 'operationsBulk'>;
  options: ISchemaObjectExtensionFieldRest;
}

export interface IResourceActionRowOptionsOperationsRowAction {
  name: keyof Omit<IResourceActionRowRecord, 'operationsRow'>;
  options: ISchemaObjectExtensionFieldRest;
}
