import type { TableIdentity } from 'table-identity';

import type { TypeFormScene } from './formMeta.js';
import type { IResourceFormActionRowNameRecord } from './resource/formActionRow.js';
import type { IResourceTableActionRecord } from './resource/tableAction.js';
import type { IResourceTableActionBulkNameRecord } from './resource/tableActionBulk.js';
import type { IResourceTableActionRowNameRecord } from './resource/tableActionRow.js';

export type IOpenapiPermissionModeActionActions = {
  [K in keyof IResourceTableActionRecord]?: boolean; // IResourceTableActionRecord[K];
};

export interface IOpenapiPermissions {
  roleIds?: TableIdentity[];
  roleNames?: string[];
  actions?: IOpenapiPermissionModeActionActions;
}

export type TypeOpenapiPermissions = IOpenapiPermissions | boolean;

export interface IPermissionHintGeneral {
  action?: string;
  public?: boolean;
  formScene?: TypeFormScene | TypeFormScene[];
}

export interface IPermissionHintTableActionRow {
  action?: keyof (IResourceFormActionRowNameRecord & IResourceTableActionRowNameRecord);
  public?: boolean;
  formScene?: TypeFormScene | TypeFormScene[];
}

export interface IPermissionHintTableActionBulk {
  action?: keyof IResourceTableActionBulkNameRecord;
  public?: boolean;
}
