import type { IRouteViewComponentItem, IRouteViewComponentMeta } from 'zova-module-a-router';

export interface RouteTabInfo {
  title?: string;
  icon?: string;
}

export interface RouteTabBase {
  tabKey: string;
  affix?: boolean;
}

export interface RouteTabInitial extends RouteTabBase {
  info?: RouteTabInfo;
}

export interface RouteTabTransient extends IRouteViewComponentMeta {}

export interface RouteTab extends RouteTabBase {
  items: IRouteViewComponentItem[];
  updatedAt: number;
  info: RouteTabInfo;
}

export interface ModelTabsOptions {
  /** -1: infinite 0: Affix Only  */
  max?: number;
  maxItems?: number;
  persister?: boolean;
  getInitialTabs: () => RouteTabInitial[] | undefined;
  getTabInfo: (tabKey: string) => RouteTabInfo | undefined;
}
