import type { IJsxRenderContextBase, TypeOpenapiPermissions, IResourceActionRowRecord, IResourceActionTableRecord } from 'zova-module-a-openapi';

import type { ControllerPageResource } from '../page/resource/controller.jsx';

export interface IPageWrapperScope {
  resource?: string;
  permissions?: TypeOpenapiPermissions;
  onActionTable?: (action: keyof IResourceActionTableRecord) => Promise<any> | any;
  onActionRow?: (action: keyof IResourceActionRowRecord, id: string) => Promise<any> | any;
}

export interface IJsxRenderContextPageWrapper extends IJsxRenderContextBase {
  $celScope: IPageWrapperScope;
  $$pageWrapper: ControllerPageResource;
}
