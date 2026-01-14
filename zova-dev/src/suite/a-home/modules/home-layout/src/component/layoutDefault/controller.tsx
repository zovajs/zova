import type { ModelTabs, ModelTabsOptions } from 'zova-module-a-tabs';
import { BeanControllerBase, Use, UseScope } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { ScopeModuleATabs } from 'zova-module-a-tabs';
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
    await $QueryAutoLoad(() => this.$$modelMenu.retrieveMenus());
  }

  private async _initTabs() {
    const configTabs = this.scope.config.tabs;
    const tabsOptions: ModelTabsOptions = {
      scene: configTabs.scene,
      max: configTabs.max,
      persister: configTabs.persister,
      getAffixTabs: () => {
        if (!this.$$modelMenu.retrieveMenus().data) return;
        return [{ key: '/', affix: true }];
      },
      getTabInfo: tab => {
        const queryMenu = this.$$modelMenu.retrieveMenus();
        if (!queryMenu.data || queryMenu.isError) return undefined;
        const menuItem = this.$$modelMenu.findMenuItem({ link: tab.key });
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
