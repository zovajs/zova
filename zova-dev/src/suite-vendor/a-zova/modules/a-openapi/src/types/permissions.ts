import type { TableIdentity } from 'table-identity';

import { IResourceActionTableRecord } from './actions.js';

export type IOpenapiPermissionModeActionActions = {
  [K in keyof IResourceActionTableRecord]?: IResourceActionTableRecord[K];
};

export interface IOpenapiPermissions {
  roleIds?: TableIdentity[];
  roleNames?: string[];
  actions?: IOpenapiPermissionModeActionActions;
}
