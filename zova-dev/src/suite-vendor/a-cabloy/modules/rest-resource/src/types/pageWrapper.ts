import type { IJsxRenderContextBase, TypeOpenapiPermissions, IResourceActionRowRecord, IResourceActionBulkRecord } from 'zova-module-a-openapi';

import type { ControllerPageResource } from '../page/resource/controller.jsx';

export interface IPageWrapperScope {
  resource?: string;
  permissions?: TypeOpenapiPermissions;
  onActionBulk?: (action: keyof IResourceActionBulkRecord) => Promise<any> | any;
  onActionRow?: (action: keyof IResourceActionRowRecord, id: string) => Promise<any> | any;
}

export interface IJsxRenderContextPageWrapper extends IJsxRenderContextBase {
  $celScope: IPageWrapperScope;
  $$pageWrapper: ControllerPageResource;
}
