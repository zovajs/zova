import type { TableIdentity } from 'table-identity';

import { TypeFormScene } from './formMeta.js';
import { IResourceTableActionRecord } from './resource/tableAction.js';

export type IOpenapiPermissionModeActionActions = {
  [K in keyof IResourceTableActionRecord]?: boolean; // IResourceTableActionRecord[K];
};

export interface IOpenapiPermissions {
  roleIds?: TableIdentity[];
  roleNames?: string[];
  actions?: IOpenapiPermissionModeActionActions;
}

export type TypeOpenapiPermissions = IOpenapiPermissions | boolean;

export interface IPermissionHint {
  action?: string;
  public?: boolean;
  formScene?: TypeFormScene | TypeFormScene[];
}
