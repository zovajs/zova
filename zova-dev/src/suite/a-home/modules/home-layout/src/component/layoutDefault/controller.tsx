import type { ModelTabsOptions } from 'zova-module-a-tabs';
import { BeanControllerBase, Use, UseScope } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelTabs, ScopeModuleATabs } from 'zova-module-a-tabs';
import { ModelPassport } from 'zova-module-home-user';
import { ModelMenu } from '../../model/menu.js';

export interface ControllerLayoutDefaultProps {}

@Controller()
export class ControllerLayoutDefault extends BeanControllerBase {
  static $propsDefault = {};

  @UseScope()
  $$scopeModuleATabs: ScopeModuleATabs;

  @Use()
  $$modelMenu: ModelMenu;

  @Use()
  $$modelPassport: ModelPassport;

  @Use()
  $$modelTabs: ModelTabs;

  leftDrawerOpen: boolean = false;

  protected async __init__() {
    // tabs
    await this._initTabs();
    // passport
    if (process.env.SERVER) {
      await this.$$modelPassport.ensurePassport();
    }
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
  }

  private async _initTabs() {
    const configTabs = this.scope.config.tabs;
    const tabsOptions: ModelTabsOptions = {
      scene: configTabs.scene,
      max: configTabs.max,
      persister: configTabs.persister,
      getAffixTabs: () => {
        if (!this.$$modelMenu.select().data) return;
        return [{ key: '/', affix: true }];
      },
      getTabInfo: async tab => {
        const queryMenu = this.$$modelMenu.select();
        if (!queryMenu.data && !queryMenu.isError) {
          await queryMenu.suspense();
        }
        if (queryMenu.isError) {
          throw queryMenu.error;
        }
        const menuItem = this.$$modelMenu.findMenuItem(tab.key);
        if (!menuItem) return undefined;
        return { title: menuItem.title, icon: menuItem.icon };
      },
    };
    await this.$$modelTabs.initialize(tabsOptions);
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
