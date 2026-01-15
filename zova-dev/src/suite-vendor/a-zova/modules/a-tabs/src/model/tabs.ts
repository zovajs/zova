import type { IDecoratorModelOptions, UseQueryOptions } from 'zova-module-a-model';
import { mutate } from 'mutate-on-copy';
import { useComputed } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { IRouteViewComponentItem } from 'zova-module-a-router';
import { ModelTabsOptions, RouteTab, RouteTabBase, RouteTabTransient } from '../types/tabs.js';

export interface IModelOptionsTabs extends IDecoratorModelOptions {}

@Model<IModelOptionsTabs>()
export class ModelTabs extends BeanModelBase {
  tabsOptions: ModelTabsOptions;
  tabs: RouteTab[];
  tabCurrentKey?: string;
  tabCurrentIndex: number;
  tabCurrent?: RouteTab;
  keepAliveInclude: string[];

  protected async __init__(_scene: string, options: ModelTabsOptions) {
    this.bean._setBean('$$modelTabs', this);
    // options
    this.tabsOptions = this._prepareTabsOptions(options);
    // tabs
    const queryOptionsTabs: UseQueryOptions<RouteTab[]> = {
      queryKey: ['tabs'],
      meta: { defaultData: [] },
    };
    if (this.tabsOptions.persister) {
      this.tabs = this.$useStateLocal(queryOptionsTabs);
    } else {
      this.tabs = this.$useStateMem(queryOptionsTabs);
    }
    // tabCurrentKey
    const queryOptionsTabCurrentKey: UseQueryOptions<string> = {
      queryKey: ['tabCurrentKey'],
    };
    if (this.tabsOptions.persister) {
      this.tabCurrentKey = this.$useStateLocal(queryOptionsTabCurrentKey);
    } else {
      this.tabCurrentKey = this.$useStateMem(queryOptionsTabCurrentKey);
    }
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
    // watch
    this.$watch(
      this.tabsOptions.getInitialTabs,
      value => {
        this.addAffixTabs(value);
      },
      { immediate: true },
    );
  }

  async addTab(tab: RouteTabTransient): Promise<boolean> {
    const res = await this._addTab(tab);
    if (res) {
      // current
      this.tabCurrentKey = tab.tabKey;
    }
    return res;
  }

  async _addTab(tab: Partial<RouteTabTransient>, affix?: boolean): Promise<boolean> {
    // must perform await before findTab
    const tabInfo = this.tabsOptions.getTabInfo(tab.tabKey!);
    if (!tabInfo) return false;
    // max
    if (this.tabsOptions.max === 0 && !affix) return false;
    // tabs
    const [index, tabOld] = this.findTab(tab.tabKey);
    if (index === -1) {
      // new
      const items: IRouteViewComponentItem[] = tab.componentKey
        ? [{
            componentKey: tab.componentKey!,
            fullPath: tab.fullPath!,
            keepAlive: tab.keepAlive,
            updatedAt: Date.now(),
          }]
        : [];
      const tabNew: RouteTab = {
        tabKey: tab.tabKey!,
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
      this.pruneTabs();
    } else {
      // update
      if (this._checkIfTabNeedUpdate(tabOld!, tab)) {
        this.updateTab(tab);
        await this.pruneTabItems(tab.tabKey);
      }
    }
    return true;
  }

  async addAffixTabs(affixTabs?: RouteTabBase[]) {
    if (!affixTabs) {
      // donothing
      return;
    }
    // record old affixTabs
    const oldTabs: RouteTab[] = [];
    for (const tab of this.tabs) {
      if (tab.affix && affixTabs.findIndex(item => item.tabKey === tab.tabKey) === -1) {
        oldTabs.push(tab);
      }
    }
    // add new affixTabs
    for (const tab of affixTabs) {
      await this._addTab({ tabKey: tab.tabKey }, tab.affix);
    }
    // delete old affixTabs
    for (const tab of oldTabs) {
      await this.deleteTab(tab.tabKey);
    }
    // sort
    this.tabs = mutate(this.tabs, copyState => {
      copyState.sort((a, b) => {
        return Number(!!b.affix) - Number(!!a.affix);
      });
    });
  }

  async deleteTab(tabKey?: string) {
    if (!tabKey) return;
    // tabs
    const [index] = this.findTab(tabKey);
    if (index === -1) return;
    // current
    if (index === this.tabCurrentIndex) {
      // prev/next
      const tabCurrentIndex = index - 1 > -1 ? index - 1 : index + 1 < this.tabs.length ? index + 1 : -1;
      if (tabCurrentIndex > -1) {
        await this.activeTab(this.tabs[tabCurrentIndex]?.tabKey);
      }
    }
    // tabs
    this.tabs = mutate(this.tabs, copyState => {
      copyState.splice(index, 1);
    });
  }

  async deleteTabItem(tabKey?: string, componentKey?: string) {
    if (!tabKey || !componentKey) return;
    // tab
    const [index, tab] = this.findTab(tabKey);
    if (index === -1 || !tab) return;
    // items
    const items = mutate(tab.items, copyState => {
      const index = copyState.findIndex(item => item.componentKey === componentKey);
      if (index > -1) {
        copyState.splice(index, 1);
      }
    });
    const tabNew: RouteTab = { ...tab, items };
    this.tabs = mutate(this.tabs, copyState => {
      copyState.splice(index, 1, tabNew);
    });
  }

  updateTab(tab: Partial<RouteTabTransient>) {
    const tabKey = tab.tabKey!;
    const [index, tabOld] = this.findTab(tabKey);
    if (index === -1 || !tabOld) return;
    const items: IRouteViewComponentItem[] = tabOld.items ? ([] as IRouteViewComponentItem[]).concat(tabOld.items) : [];
    if (tab.componentKey) {
      const tabItemNew: IRouteViewComponentItem = {
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
    this.updateTab({ tabKey });
    this.tabCurrentKey = tabKey;
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
      await this.deleteTab(tabKey);
    }
  }

  async pruneTabItems(tabKey?: string) {
    if (!tabKey) return;
    let maxItems = this.tabsOptions.maxItems;
    if (maxItems === undefined || maxItems === -1) return;
    if (maxItems < 1) maxItems = 1;
    while (true) {
      const [_, tab] = this.findTab(tabKey);
      if (!tab) break;
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
      await this.deleteTabItem(tabKey, componentKey);
    }
  }

  // special for _addTab
  private _checkIfTabNeedUpdate(tabOld: RouteTab, tabNew: Partial<RouteTabTransient>) {
    for (const key in tabNew) {
      if (['fullPath', 'keepAlive', 'updatedAt'].includes(key)) continue;
      if (['componentKey'].includes(key)) {
        if (!tabOld.items) return true;
        const tabOldItem = tabOld.items.find(item => item[key] === tabNew[key]);
        if (!tabOldItem) return true;
        for (const key2 of ['fullPath', 'keepAlive']) {
          if (tabOldItem[key2] !== tabNew[key2]) return true;
        }
        const recentItemIndex = tabOld.items.findIndex(
          item => item[key] !== tabOld[key] && (item.updatedAt ?? 0) > (tabOldItem.updatedAt ?? 0),
        );
        if (recentItemIndex > -1) return true;
      } else if (tabNew[key] !== tabOld[key]) {
        return true;
      }
    }
    const recentTabIndex = this.tabs.findIndex(
      item => item.tabKey !== tabOld.tabKey && (item.updatedAt ?? 0) > (tabOld.updatedAt ?? 0),
    );
    if (recentTabIndex > -1) return true;
    return false;
  }

  private _prepareTabsOptions(options: ModelTabsOptions): ModelTabsOptions {
    return {
      ...options,
      max: options.max ?? -1,
      maxItems: options.maxItems ?? -1,
      persister: process.env.CLIENT && !!options.persister,
    };
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
}
