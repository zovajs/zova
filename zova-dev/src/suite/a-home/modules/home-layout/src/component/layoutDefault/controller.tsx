import type { ModelTabs, ModelTabsOptions, ScopeModuleATabs } from 'zova-module-a-tabs';
import type { ModelAuth, ModelUser } from 'zova-module-home-user';
import type { ModelMenu } from '../../model/menu.js';
import { BeanControllerBase, Use, UseScope } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerLayoutDefaultProps {}

export interface ControllerLayoutDefaultEmits {}

export interface ControllerLayoutDefaultSlots {}

@Controller()
export class ControllerLayoutDefault extends BeanControllerBase {
  static $propsDefault = {};

  @UseScope()
  $$scopeModuleATabs: ScopeModuleATabs;

  @Use()
  $$modelMenu: ModelMenu;

  @Use()
  $$modelAuth: ModelAuth;

  @Use()
  $$modelUser: ModelUser;

  @Use()
  $$modelTabs: ModelTabs;

  leftDrawerOpen: boolean = false;

  protected async __init__() {
    // tabs
    await this._initTabs();
    // user
    if (process.env.SERVER) {
      await this.$$modelUser.ensureUser();
    }
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
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
