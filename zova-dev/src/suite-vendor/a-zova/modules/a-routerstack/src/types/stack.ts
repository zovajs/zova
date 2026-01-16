import type { IRouteViewComponentMeta } from 'zova-module-a-router';

export interface ModelStackOptions {
  /** -1: infinite 0: Affix Only  */
  max?: number;
}

export interface RouteTabBase {
  tabKey: string;
}

export interface RouteTabTransient extends IRouteViewComponentMeta {}

export interface RouteTab extends RouteTabBase {
  updatedAt: number;
}
