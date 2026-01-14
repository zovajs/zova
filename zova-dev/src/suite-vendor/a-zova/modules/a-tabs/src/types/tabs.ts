import type { IRouteViewComponentItem, IRouteViewComponentMeta } from 'zova-module-a-router';

export interface RouteTabInfo {
  title?: string;
  icon?: string;
}

export interface RouteTabBase {
  tabKey: string;
  affix?: boolean;
}

export interface RouteTabTransient extends IRouteViewComponentMeta {}

export interface RouteTab extends RouteTabBase {
  items: IRouteViewComponentItem[];
  updatedAt: number;
  info: RouteTabInfo;
}

export interface ModelTabsOptions {
  scene?: string;
  /** -1: infinite 0: Affix Only  */
  max?: number;
  persister?: boolean;
  getAffixTabs: () => RouteTabBase[] | undefined;
  getTabInfo: (tab: Partial<RouteTabTransient>) => RouteTabInfo | undefined;
}
