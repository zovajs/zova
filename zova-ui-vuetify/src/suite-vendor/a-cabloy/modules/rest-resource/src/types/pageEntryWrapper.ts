import type { TableIdentity } from 'table-identity';
import type {
  IJsxRenderContextBase,
  TypeOpenapiPermissions,
  TypeResourceActionRowRecord,
  TypeResourceActionTableRecord,
} from 'zova-module-a-openapi';

import type { ControllerPageEntry } from '../page/entry/controller.jsx';

export interface IPageEntryWrapperScope {
  resource?: string;
  id?: TableIdentity;
  permissions?: TypeOpenapiPermissions;
  onActionTable?: (action: keyof TypeResourceActionTableRecord) => Promise<any> | any;
  onActionRow?: (action: keyof TypeResourceActionRowRecord) => Promise<any> | any;
}

export interface IJsxRenderContextPageEntryWrapper extends IJsxRenderContextBase {
  $celScope: IPageEntryWrapperScope;
  $$pageEntryWrapper: ControllerPageEntry;
}
