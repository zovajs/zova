export interface RouteTabInfo {
  title?: string;
  icon?: string;
}

export interface RouteTabBase {
  key: string;
  name?: string;
  keepAlive?: boolean;
  affix?: boolean;
  updatedAt?: number;
  info?: RouteTabInfo;
}

export interface RouteTab extends RouteTabBase {
  fullPath?: string;
}

export interface RouteTabRecord extends RouteTabBase {
  fullPath: string[];
}

export interface ModelTabsOptions {
  scene?: string;
  /** -1: infinite 0: Affix Only  */
  max?: number;
  persister?: boolean;
  getAffixTabs: () => RouteTab[] | undefined;
  getTabInfo: (tab: RouteTab) => RouteTabInfo | undefined;
}