import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { ModelMenu } from '../../model/menu.js';
import { IServiceSsrOptions, ServiceSsr } from '../../service/ssr.js';

export interface ControllerLayoutTabsProps {}

@Controller()
export class ControllerLayoutTabs extends BeanControllerBase {
  static $propsDefault = {};

  @Use()
  $$modelMenu: ModelMenu;

  @Use({ init: { arg: { sidebarLeftOpenPC: false } as IServiceSsrOptions } })
  $$ssr: ServiceSsr;

  leftDrawerOpen: boolean = false;

  protected async __init__() {
    // menu
    await $QueryAutoLoad(() => this.$$modelMenu.retrieveMenus());
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
