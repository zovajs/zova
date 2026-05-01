import type { TableIdentity } from 'table-identity';
import type { IJsxRenderContextBase, TypeOpenapiPermissions } from 'zova-module-a-openapi';

import type { ControllerPageEntry } from '../page/entry/controller.jsx';

export interface IPageEntryWrapperScope {
  resource?: string;
  id?: TableIdentity;
  permissions?: TypeOpenapiPermissions;
}

export interface IJsxRenderContextPageEntryWrapper extends IJsxRenderContextBase {
  $celScope: IPageEntryWrapperScope;
  $$pageEntryWrapper: ControllerPageEntry;
}
