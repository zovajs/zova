import type { RouteLocationNormalizedLoaded } from '@cabloy/vue-router';
import type { ComponentInternalInstance } from 'vue';

export interface IRouteViewComponentItemBase {
  componentKey: string;
  fullPath: string;
  name: string;
  keepAlive?: boolean;
}

export interface IRouteViewComponentItem extends IRouteViewComponentItemBase {
  updatedAt: number;
}

export interface IRouteViewComponentMeta extends IRouteViewComponentItemBase {
  tabKey: string;
}

export interface IRouterViewSlotParams {
  Component: ComponentInternalInstance;
  route: RouteLocationNormalizedLoaded;
}
