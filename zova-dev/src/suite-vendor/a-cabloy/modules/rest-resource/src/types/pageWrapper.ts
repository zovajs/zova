import type { IJsxRenderContextBase, TypeOpenapiPermissions } from 'zova-module-a-openapi';

import type { ControllerPageResource } from '../page/resource/controller.jsx';

export interface IPageWrapperScope {
  resource?: string;
  permissions?: TypeOpenapiPermissions;
}

export interface IJsxRenderContextPageWrapper extends IJsxRenderContextBase {
  $celScope: IPageWrapperScope;
  $$pageWrapper: ControllerPageResource;
}
