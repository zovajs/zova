import type { TableIdentity } from 'table-identity';

export interface IOpenapiActionRecord {
  create: boolean;
  view: boolean;
  update: boolean;
  delete: boolean;
}

export type IOpenapiPermissionModeActionActions = {
  [K in keyof IOpenapiActionRecord]?: IOpenapiActionRecord[K];
};

export interface IOpenapiPermissions {
  roleIds?: TableIdentity[];
  roleNames?: string[];
  actions?: IOpenapiPermissionModeActionActions;
}
