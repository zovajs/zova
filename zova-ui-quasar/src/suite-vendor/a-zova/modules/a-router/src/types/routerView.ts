import type { RouteLocationNormalizedLoaded } from '@cabloy/vue-router';
import type { ComponentInternalInstance } from 'vue';

export interface IRouteViewRouteItemBase {
  componentKey: string;
  fullPath: string;
  keepAlive?: boolean;
}

export interface IRouteViewRouteItem extends IRouteViewRouteItemBase {
  updatedAt: number;
}

export interface IRouteViewRouteMeta extends IRouteViewRouteItemBase {
  tabKey: string;
}

export interface IRouterViewSlotParams {
  Component: ComponentInternalInstance;
  route: RouteLocationNormalizedLoaded;
}
