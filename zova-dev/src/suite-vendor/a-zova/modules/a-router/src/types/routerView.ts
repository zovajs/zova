import type { RouteLocationNormalizedLoaded } from '@cabloy/vue-router';
import type { ComponentInternalInstance } from 'vue';

export interface IRouteViewComponentMeta {
  key: string;
  componentKey: string;
  fullPath?: string;
  name?: string;
  keepAlive?: boolean;
}

export interface IRouterViewSlotParams {
  Component: ComponentInternalInstance;
  route: RouteLocationNormalizedLoaded;
}
