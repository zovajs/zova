import { BeanControllerBase, PropsBase, RequiredSome, Use, useComputed, useCustomRef } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelLayout } from '../../bean/model.layout.js';
import { ModelMenu } from '../../bean/model.menu.js';

export interface Props extends PropsBase<ControllerLayoutDefault, Slots> {}

export interface Emits {}

export interface Slots {}

@Controller()
export class ControllerLayoutDefault extends BeanControllerBase<
  unknown,
  RequiredSome<Props, keyof typeof ControllerLayoutDefault.$propsDefault>,
  Emits,
  Slots
> {
  static $propsDefault = {};

  @Use()
  $$modelMenu: ModelMenu;

  @Use()
  $$modelLayout: ModelLayout;

  leftDrawerOpen: boolean;
  leftDrawerOpenMobile: boolean = false;
  belowBreakpoint: boolean;

  protected async __init__() {
    // belowBreakpoint
    this.belowBreakpoint = useComputed(() => {
      let width;
      if (process.env.SERVER) {
        width = 0;
      } else {
        width = document.documentElement.clientWidth;
      }
      return width <= this.sys.config.layout.sidebar.breakpoint;
    });
    // leftDrawerOpen
    this.leftDrawerOpen = useCustomRef(() => {
      const self = this;
      return {
        get() {
          return self.belowBreakpoint ? self.leftDrawerOpenMobile : self.$$modelLayout.leftDrawerOpenPC;
        },
        set(value) {
          self.belowBreakpoint ? (self.leftDrawerOpenMobile = value) : (self.$$modelLayout.leftDrawerOpenPC = value);
        },
      };
    });
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
