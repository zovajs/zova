import type { TableIdentity } from 'table-identity';
import type { IJsxRenderContextBase, TypeOpenapiPermissions, IResourceActionRowRecord, IResourceActionBulkRecord } from 'zova-module-a-openapi';

import type { ControllerPageEntry } from '../page/entry/controller.jsx';

export interface IPageEntryWrapperScope {
  resource?: string;
  id?: TableIdentity;
  permissions?: TypeOpenapiPermissions;
  onActionBulk?: (action: keyof IResourceActionBulkRecord) => Promise<any> | any;
  onActionRow?: (action: keyof IResourceActionRowRecord) => Promise<any> | any;
}

export interface IJsxRenderContextPageEntryWrapper extends IJsxRenderContextBase {
  $celScope: IPageEntryWrapperScope;
  $$pageEntryWrapper: ControllerPageEntry;
}
