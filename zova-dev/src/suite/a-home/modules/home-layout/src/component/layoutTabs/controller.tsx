import type { ModelTabs, ModelTabsOptions } from 'zova-module-a-routertabs';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { ModelPassport } from 'zova-module-home-user';
import { ModelMenu } from '../../model/menu.js';

export interface ControllerLayoutTabsProps {}

@Controller()
export class ControllerLayoutTabs extends BeanControllerBase {
  static $propsDefault = {};

  $$modelTabs: ModelTabs;

  @Use()
  $$modelMenu: ModelMenu;

  @Use()
  $$modelPassport: ModelPassport;

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
      max: configTabs.max,
      maxItems: configTabs.maxItems,
      persister: configTabs.persister,
      getInitialTabs: () => {
        if (!this.$$modelMenu.retrieveMenus().data) return;
        return [{ tabKey: '/', affix: true }];
      },
      getTabInfo: tabKey => {
        const queryMenu = this.$$modelMenu.retrieveMenus();
        if (!queryMenu.data || queryMenu.isError) return undefined;
        const menuItem = this.$$modelMenu.findMenuItem({ link: tabKey });
        if (!menuItem) return undefined;
        return { title: menuItem.title, icon: menuItem.icon };
      },
    };
    this.$$modelTabs = await this.bean._getBeanSelector('a-routertabs.model.tabs', true, configTabs.scene ?? '', tabsOptions);
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
