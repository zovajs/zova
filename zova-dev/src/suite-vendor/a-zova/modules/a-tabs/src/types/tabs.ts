export interface RouteTabInfo {
  title?: string;
  icon?: string;
}

export interface RouteTabBase {
  key: string;
  affix?: boolean;
}

export interface RouteTabItem {
  fullPath?: string;
  name?: string;
  keepAlive?: boolean;
}

export interface RouteTabTransient extends RouteTabBase, RouteTabItem {}

export interface RouteTab extends RouteTabBase {
  items: RouteTabItem[];
  updatedAt?: number;
  info?: RouteTabInfo;
}

export interface ModelTabsOptions {
  scene?: string;
  /** -1: infinite 0: Affix Only  */
  max?: number;
  persister?: boolean;
  getAffixTabs: () => RouteTabTransient[] | undefined;
  getTabInfo: (tab: RouteTabTransient) => RouteTabInfo | undefined;
}
