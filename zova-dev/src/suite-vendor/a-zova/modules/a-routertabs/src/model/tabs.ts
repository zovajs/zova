import type { IDecoratorModelOptions, UseQueryOptions } from 'zova-module-a-model';
import { RouteLocationNormalizedLoaded, RouteLocationNormalizedLoadedGeneric } from '@cabloy/vue-router';
import { mutate } from 'mutate-on-copy';
import { deepExtend, useComputed } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { IRouteViewRouteItem, IRouteViewRouteMeta } from 'zova-module-a-router';
import { ModelTabsOptions, ModelTabsOptionsBase, RouteTab, RouteTabTransient } from '../types/tabs.js';

export interface IModelOptionsTabs extends IDecoratorModelOptions, ModelTabsOptionsBase {}

@Model<IModelOptionsTabs>({
  enableSelector: true,
  max: -1,
  maxItems: -1,
  cache: false,
})
export class ModelTabs extends BeanModelBase {
  tabsOptions: ModelTabsOptions;
  tabs: RouteTab[];
  tabCurrentKey?: string;
  tabCurrentIndex: number;
  tabCurrent?: RouteTab;
  keepAliveInclude: string[];

  protected async __init__(scene: string, options?: ModelTabsOptions) {
    await super.__init__(scene);
    this.bean._setBean('$$modelTabs', this);
    // options
    this.tabsOptions = deepExtend({}, this.$onionOptions, options);
    // computed
    this.tabCurrentIndex = useComputed(() => {
      const [index] = this.findTab(this.tabCurrentKey);
      return index;
    });
    this.tabCurrent = useComputed(() => {
      const [, tab] = this.findTab(this.tabCurrentKey);
      return tab;
    });
    this.keepAliveInclude = useComputed(() => {
      return this._getKeepAliveInclude();
    });
    // tabCurrentKey
    const queryOptionsTabCurrentKey: UseQueryOptions<string> = {
      queryKey: ['tabCurrentKey'],
    };
    if (this.tabsOptions.cache) {
      this.tabCurrentKey = this.$useStateDb(queryOptionsTabCurrentKey);
    } else {
      this.tabCurrentKey = this.$useStateMem(queryOptionsTabCurrentKey);
    }
    // tabs
    const queryOptionsTabs: UseQueryOptions<RouteTab[]> = {
      queryKey: ['tabs'],
      meta: {
        defaultData: this._getInitialTabs(),
      },
    };
    if (this.tabsOptions.cache) {
      this.tabs = this.$useStateDb(queryOptionsTabs);
    } else {
      this.tabs = this.$useStateMem(queryOptionsTabs);
    }
    // load cache
    if (this.tabsOptions.cache) {
      await this.$loadStateDb(this.tabCurrentKey);
      await this.$loadStateDb(this.tabs);
    }
    // first route
    if (this.$pageRoute) {
      this.forwardRoute(this.$pageRoute);
    }
  }

  get cache() {
    return this.tabsOptions.cache;
  }

  // need not async
  addTab(tab: RouteTabTransient, affix?: boolean): boolean {
    const res = this._addTab(tab, affix);
    // current
    this.tabCurrentKey = res ? tab.tabKey : undefined;
    return res;
  }

  // need not async
  _addTab(tab: Partial<RouteTabTransient>, affix?: boolean): boolean {
    const tabKey = tab.tabKey;
    if (!tabKey) return false;
    // tab
    const [index, tabOld] = this.findTab(tabKey);
    // tabInfo
    const tabInfo = this.tabsOptions.getTabInfo?.(tabKey) ?? tabOld?.info;
    if (!tabInfo) return false;
    // tabs
    if (index === -1) {
      // new
      const items: IRouteViewRouteItem[] = tab.componentKey
        ? [{
            componentKey: tab.componentKey!,
            fullPath: tab.fullPath!,
            keepAlive: tab.keepAlive,
            updatedAt: Date.now(),
          }]
        : [];
      const tabNew: RouteTab = {
        tabKey,
        affix,
        items,
        updatedAt: Date.now(),
        info: tabInfo,
      };
      if (this.tabCurrentIndex === -1) {
        this.tabs = mutate(this.tabs, copyState => {
          copyState.push(tabNew);
        });
      } else {
        this.tabs = mutate(this.tabs, copyState => {
          copyState.splice(this.tabCurrentIndex + 1, 0, tabNew);
        });
      }
      // need not await
      this.pruneTabs();
    } else {
      // update
      if (!this._checkIfTabNeedUpdate(tabOld!, tab)) {
        return true;
      }
      this.updateTab(tab);
      // need not await
      this.pruneTabItems(tabKey);
    }
    return true;
  }

  async deleteTab(tabKey?: string, noActiveNext?: boolean) {
    if (!tabKey) return;
    // tabs
    const [index] = this.findTab(tabKey);
    if (index === -1) return;
    // current
    let tabKeyActiveNext;
    if (!noActiveNext && index === this.tabCurrentIndex) {
      // prev/next
      const tabCurrentIndex = index - 1 > -1 ? index - 1 : index + 1 < this.tabs.length ? index + 1 : -1;
      if (tabCurrentIndex > -1) {
        tabKeyActiveNext = this.tabs[tabCurrentIndex]?.tabKey;
      }
    }
    // tabs
    this.tabs = mutate(this.tabs, copyState => {
      copyState.splice(index, 1);
    });
    // active next
    if (tabKeyActiveNext) {
      await this.activeTab(tabKeyActiveNext);
    }
  }

  async deleteTabItem(tabKey?: string, componentKey?: string, noActiveNext?: boolean) {
    if (!tabKey || !componentKey) return false;
    if (tabKey === componentKey) return false; // not delete first tabItem
    // tab
    const [index, tab] = this.findTab(tabKey);
    if (index === -1 || !tab) return false;
    // indexItem
    if (!tab.items) return false;
    const indexItem = tab.items.findIndex(item => item.componentKey === componentKey);
    if (indexItem === -1) return false;
    if (tab.items.length === 1 && !tab.affix) {
      // delete tab
      await this.deleteTab(tabKey, noActiveNext);
    } else {
      // delete tab item
      const items = mutate(tab.items, copyState => {
        copyState.splice(indexItem, 1);
      });
      const tabNew: RouteTab = { ...tab, items };
      this.tabs = mutate(this.tabs, copyState => {
        copyState.splice(index, 1, tabNew);
      });
    }
    return true;
  }

  findTabItemByFullPath(fullPath: string) {
    for (const tab of this.tabs) {
      if (!tab.items) continue;
      for (const item of tab.items) {
        if (item.fullPath === fullPath) {
          return [tab.tabKey, item.componentKey];
        }
      }
    }
    return [];
  }

  updateTab(tab: Partial<RouteTabTransient>) {
    const tabKey = tab.tabKey!;
    const [index, tabOld] = this.findTab(tabKey);
    if (index === -1 || !tabOld) return;
    const items: IRouteViewRouteItem[] = tabOld.items ? ([] as IRouteViewRouteItem[]).concat(tabOld.items) : [];
    if (tab.componentKey) {
      const tabItemNew: IRouteViewRouteItem = {
        componentKey: tab.componentKey,
        fullPath: tab.fullPath!,
        keepAlive: tab.keepAlive,
        updatedAt: Date.now(),
      };
      const index = items.findIndex(item => item.componentKey === tab.componentKey);
      if (index === -1) {
        items.push(tabItemNew);
      } else {
        items.splice(index, 1, tabItemNew);
      }
      // not use fullPath, because fullPath has query string
      items.sort((a, b) => (a.componentKey === tabKey ? 0 : 1) - (b.componentKey === tabKey ? 0 : 1));
    }
    const tabNew: RouteTab = {
      ...tabOld,
      tabKey,
      items,
      updatedAt: Date.now(),
    };
    this.tabs = mutate(this.tabs, copyState => {
      copyState.splice(index, 1, tabNew);
    });
  }

  async activeTab(tabKey?: string) {
    if (!tabKey) return;
    const [_, tab] = this.findTab(tabKey);
    if (!tab) return;
    // should not updateTab here
    // this.updateTab({ tabKey });
    // this.tabCurrentKey = tabKey;
    // first check tab.items?.[0]?.fullPath, because fullPath maybe has query string
    const tabItemFirst = tab.items?.[0];
    const path = tabItemFirst?.componentKey === tabKey ? tabItemFirst.fullPath : tabKey;
    await this.$router.push(path);
  }

  findTab(tabKey?: string): [number, RouteTab | undefined] {
    if (!tabKey) return [-1, undefined];
    const index = this.tabs.findIndex(item => item.tabKey === tabKey);
    if (index === -1) return [index, undefined];
    return [index, this.tabs[index]];
  }

  async pruneTabs() {
    let max = this.tabsOptions.max;
    if (max === undefined || max === -1) return;
    if (max < 1) max = 1;
    while (true) {
      const affixCount = this.tabs.filter(item => item.affix).length;
      if (this.tabs.length - affixCount <= max) break;
      let tabKey: string | undefined;
      let updatedAt = Date.now();
      for (const tab of this.tabs) {
        if (!tab.affix && tab.updatedAt < updatedAt) {
          tabKey = tab.tabKey;
          updatedAt = tab.updatedAt;
        }
      }
      if (!tabKey) break;
      await this.deleteTab(tabKey, true);
    }
  }

  async pruneTabItems(tabKey?: string) {
    if (!tabKey) return;
    let maxItems = this.tabsOptions.maxItems;
    if (maxItems === undefined || maxItems === -1) return;
    if (maxItems < 1) maxItems = 1;
    while (true) {
      const [_, tab] = this.findTab(tabKey);
      if (!tab || !tab.items) break;
      const ignoreCount = tab.items.filter(item => item.componentKey === tabKey).length;
      if (tab.items.length - ignoreCount <= maxItems) break;
      let componentKey: string | undefined;
      let updatedAt = Date.now();
      for (const tabItem of tab.items) {
        if (tabItem.componentKey !== tabKey && tabItem.updatedAt < updatedAt) {
          componentKey = tabItem.componentKey;
          updatedAt = tabItem.updatedAt;
        }
      }
      if (!componentKey) break;
      await this.deleteTabItem(tabKey, componentKey, true);
    }
  }

  // special for _addTab
  private _checkIfTabNeedUpdate(tabOld: RouteTab, tabNew: Partial<RouteTabTransient>) {
    for (const key in tabNew) {
      if (['fullPath', 'keepAlive', 'updatedAt'].includes(key)) continue;
      if (['componentKey'].includes(key)) {
        if (!tabOld.items) return true;
        const tabItemOld = tabOld.items.find(item => item[key] === tabNew[key]);
        if (!tabItemOld) return true;
        for (const key2 of ['fullPath', 'keepAlive']) {
          if (tabItemOld[key2] !== tabNew[key2]) return true;
        }
        const recentItemIndex = tabOld.items.findIndex(
          item => item[key] !== tabItemOld[key] && (item.updatedAt ?? 0) >= (tabItemOld.updatedAt ?? 0),
        );
        if (recentItemIndex > -1) return true;
      } else if (tabNew[key] !== tabOld[key]) {
        return true;
      }
    }
    const recentTabIndex = this.tabs.findIndex(
      item => item.tabKey !== tabOld.tabKey && (item.updatedAt ?? 0) >= (tabOld.updatedAt ?? 0),
    );
    if (recentTabIndex > -1) return true;
    return false;
  }

  private _getKeepAliveInclude() {
    const include: string[] = [];
    for (const tab of this.tabs) {
      if (!tab.items) continue;
      for (const item of tab.items) {
        if (item.keepAlive !== false && item.componentKey) {
          if (!include.includes(item.componentKey)) {
            include.push(item.componentKey);
          }
        }
      }
    }
    return include;
  }

  private _getInitialTabs() {
    const tabs = this.tabsOptions.getInitialTabs?.() ?? [];
    if (!this.tabsOptions.getTabInfo) return tabs;
    return tabs.map(tab => {
      return {
        ...tab,
        info: this.tabsOptions.getTabInfo?.(tab.tabKey) ?? tab.info,
      };
    });
  }

  backRoute(route: RouteLocationNormalizedLoadedGeneric) {
    const [tabKey, componentKey] = this.findTabItemByFullPath(route.fullPath);
    this.deleteTabItem(tabKey, componentKey, true);
  }

  forwardRoute(route: RouteLocationNormalizedLoadedGeneric) {
    const routeMeta = this.prepareRouteMeta(route);
    this.addTab(routeMeta);
  }

  prepareRouteMeta(route: RouteLocationNormalizedLoadedGeneric): IRouteViewRouteMeta {
    // fullPath
    const fullPath = route.fullPath;
    // componentKey
    const componentKey = this.__handleRoutePropComponentKey(route);
    // tabKey
    const tabKey = this._handleRouteProp(route, 'tabKey') || componentKey;
    // keepAlive
    const keepAlive = this._handleRouteProp(route, 'keepAlive');
    // tab
    return { tabKey, componentKey, fullPath, keepAlive };
  }

  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'componentKey' | 'tabKey'): string;
  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'keepAlive'): boolean;
  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop) {
    let value = route.meta[prop];
    if (typeof value === 'function') {
      value = value.call(this.app, route);
    }
    return value;
  }

  private __handleRoutePropComponentKey(route: RouteLocationNormalizedLoaded) {
    const componentKey = this._handleRouteProp(route, 'componentKey');
    if (componentKey) return componentKey;
    // name
    const name = this.$router.getRealRouteName(route.name);
    // path
    if (!name) return route.path;
    // name: nameOnly
    if (route.meta.componentKeyMode === 'nameOnly') return name;
    // name: withParams
    return route.path;
  }
}
