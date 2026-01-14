import type { IDecoratorModelOptions, UseQueryOptions } from 'zova-module-a-model';
import { mutate } from 'mutate-on-copy';
import { useComputed } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { ModelTabsOptions, RouteTab, RouteTabItem, RouteTabTransient } from '../types/tabs.js';

export interface IModelOptionsTabs extends IDecoratorModelOptions {}

@Model<IModelOptionsTabs>()
export class ModelTabs extends BeanModelBase {
  tabsOptions: ModelTabsOptions;
  tabs: RouteTab[];
  tabCurrentKey?: string;
  tabCurrentIndex: number;
  tabCurrent?: RouteTab;
  keepAliveInclude: string[];

  protected async __init__() {
    this.bean._setBean('$$modelTabs', this);
  }

  async initialize(options: ModelTabsOptions) {
    // options
    this.tabsOptions = this._prepareTabsOptions(options);
    // tabs
    const queryOptionsTabs: UseQueryOptions<RouteTab[]> = {
      queryKey: [this.tabsOptions.scene, 'tabs'],
      meta: { defaultData: [] },
    };
    if (this.tabsOptions.persister) {
      this.tabs = this.$useStateLocal(queryOptionsTabs);
    } else {
      this.tabs = this.$useStateMem(queryOptionsTabs);
    }
    // tabCurrentKey
    const queryOptionsTabCurrentKey: UseQueryOptions<string> = {
      queryKey: [this.tabsOptions.scene, 'tabCurrentKey'],
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
      this.tabsOptions.getAffixTabs,
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
      this.tabCurrentKey = tab.key;
    }
    return res;
  }

  async _addTab(tab: RouteTabTransient): Promise<boolean> {
    // must perform await before findTab
    const tabInfo = this.tabsOptions.getTabInfo(tab);
    if (!tabInfo) return false;
    // max
    if (this.tabsOptions.max === 0 && !tab.affix) return false;
    // tabs
    const [index, tabOld] = this.findTab(tab.key);
    if (index === -1) {
      // new
      const items = tab.fullPath ? [{ fullPath: tab.fullPath, name: tab.name, keepAlive: tab.keepAlive }] : [];
      const tabNew: RouteTab = {
        key: tab.key,
        affix: tab.affix,
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
      }
    }
    return true;
  }

  async addAffixTabs(affixTabs?: RouteTabTransient[]) {
    if (!affixTabs) {
      // donothing
      return;
    }
    // record old affixTabs
    const oldTabs: RouteTab[] = [];
    for (const tab of this.tabs) {
      if (tab.affix && affixTabs.findIndex(item => item.key === tab.key) === -1) {
        oldTabs.push(tab);
      }
    }
    // add new affixTabs
    for (const tab of affixTabs) {
      await this._addTab(tab);
    }
    // delete old affixTabs
    for (const tab of oldTabs) {
      await this.deleteTab(tab.key);
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
        await this.activeTab(this.tabs[tabCurrentIndex]?.key);
      }
    }
    // tabs
    this.tabs = mutate(this.tabs, copyState => {
      copyState.splice(index, 1);
    });
  }

  updateTab(tab: RouteTabTransient) {
    const [index, tabOld] = this.findTab(tab.key);
    if (index === -1 || !tabOld) return;
    const items: RouteTabItem[] = tabOld.items ? ([] as RouteTabItem[]).concat(tabOld.items) : [];
    if (tab.fullPath) {
      if (items.findIndex(item => item.fullPath === tab.fullPath) === -1) {
        items.push({ fullPath: tab.fullPath, name: tab.name, keepAlive: tab.keepAlive });
        items.sort((a, b) => a.fullPath!.length - b.fullPath!.length);
      }
    }
    const tabNew: RouteTab = {
      ...tabOld,
      key: tab.key,
      affix: tab.affix ?? tabOld.affix,
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
    this.updateTab({ key: tabKey });
    this.tabCurrentKey = tabKey;
    await this.$router.push(tab.items?.[0]?.fullPath || tab.key);
  }

  findTab(tabKey?: string): [number, RouteTab | undefined] {
    if (!tabKey) return [-1, undefined];
    const index = this.tabs.findIndex(item => item.key === tabKey);
    if (index === -1) return [index, undefined];
    return [index, this.tabs[index]];
  }

  async pruneTabs() {
    if (this.tabsOptions.max === undefined || this.tabsOptions.max === -1) return;
    while (this.tabs.length > this.tabsOptions.max) {
      let key: string | undefined;
      let updatedAt = Date.now();
      for (const tab of this.tabs) {
        if (!tab.affix && tab.updatedAt! < updatedAt) {
          key = tab.key;
          updatedAt = tab.updatedAt!;
        }
      }
      if (!key) break;
      await this.deleteTab(key);
    }
  }

  // special for _addTab
  private _checkIfTabNeedUpdate(tabOld: RouteTab, tabNew: RouteTabTransient) {
    for (const key in tabNew) {
      if (['componentKey', 'name', 'keepAlive'].includes(key)) continue;
      if (['fullPath'].includes(key)) {
        if (!tabOld.items || tabOld.items.findIndex(item => item[key] === tabNew[key]) === -1) return true;
      } else if (tabNew[key] !== tabOld[key]) {
        return true;
      }
    }
    const recentTabIndex = this.tabs.findIndex(
      item => item.key !== tabOld.key && (item.updatedAt ?? 0) > (tabOld.updatedAt ?? 0),
    );
    if (recentTabIndex > -1) return true;
    return false;
  }

  private _prepareTabsOptions(options: ModelTabsOptions) {
    options.scene = options.scene ?? '';
    options.max = options.max ?? -1;
    options.persister = process.env.CLIENT && !!options.persister;
    return options;
  }

  private _getKeepAliveInclude() {
    const include: string[] = [];
    for (const tab of this.tabs) {
      if (tab.items) {
        for (const item of tab.items) {
          if (item.keepAlive !== false && item.name) {
            if (!include.includes(item.name)) {
              include.push(item.name);
            }
          }
        }
      }
    }
    return include;
  }
}
