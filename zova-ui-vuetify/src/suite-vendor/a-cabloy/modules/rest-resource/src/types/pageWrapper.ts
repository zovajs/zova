import type { IJsxRenderContextBase, TypeOpenapiPermissions, TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import type { ControllerPageResource } from '../page/resource/controller.jsx';

export interface IPageWrapperScope {
  resource?: string;
  permissions?: TypeOpenapiPermissions;
  onActionTable?: (action: keyof TypeResourceActionTableRecord) => Promise<any> | any;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, id: string) => Promise<any> | any;
}

export interface IJsxRenderContextPageWrapper extends IJsxRenderContextBase {
  $celScope: IPageWrapperScope;
  $$pageWrapper: ControllerPageResource;
}
