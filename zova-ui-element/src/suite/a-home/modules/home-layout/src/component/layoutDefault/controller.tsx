import { RouteLocationNormalizedLoaded, useRoute } from '@cabloy/vue-router';
import * as TreeLodash from 'tree-lodash';
import { Tree } from 'tree-lodash/dist/esm/types.js';
import { BeanControllerBase, PropsBase, Use, useComputed } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ApiMenuEntity } from '../../api/menu.js';
import { ModelMenu } from '../../bean/model.menu.js';

export interface Props extends PropsBase<ControllerLayoutDefault, Slots> {}

export interface Emits {}

export interface Slots {}

@Controller()
export class ControllerLayoutDefault extends BeanControllerBase {
  static $propsDefault = {};

  @Use()
  $$modelMenu: ModelMenu;

  activeMenuItemKey: string;
  activeMenuSubKeys: string[];

  leftDrawerOpen: boolean = false;

  protected async __init__() {
    const route = useRoute();
    this.activeMenuItemKey = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return;
      return this._calcActiveMenuItemKey(data, route);
    });
    this.activeMenuSubKeys = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return [];
      return this._calcActiveMenuSubKeys(data);
    });
    // menu
    const queryMenus = this.$$modelMenu.select();
    await queryMenus.suspense();
    if (queryMenus.error) throw queryMenus.error;
  }

  private _calcActiveMenuItemKey(menuItemsSrc: ApiMenuEntity[], route: RouteLocationNormalizedLoaded) {
    const tree: Tree<'children'> = {
      key: '',
      children: menuItemsSrc,
    };
    const menuItem = TreeLodash.find(tree, menuItemSrc => {
      return menuItemSrc.to === route.path;
    });
    return menuItem?.key;
  }

  private _calcActiveMenuSubKeys(menuItemsSrc: ApiMenuEntity[]) {
    const tree: Tree<'children'> = {
      key: '',
      children: menuItemsSrc,
    };
    const menuItem = TreeLodash.find(tree, menuItemSrc => {
      return menuItemSrc.children && !!menuItemSrc.children.find(item => this.activeMenuItemKey === item.key);
    });
    return menuItem ? [menuItem.key] : [];
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
