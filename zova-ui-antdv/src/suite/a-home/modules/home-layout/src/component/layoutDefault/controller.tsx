import { BeanControllerBase, Use, PropsBase, useComputed, iconh } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelMenu } from '../../bean/model.menu.js';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import * as TreeLodash from 'tree-lodash';
import { Tree } from 'tree-lodash/dist/esm/types.js';
import { MenuItemGroupType } from 'ant-design-vue/es/menu/src/interface.js';
import { ApiMenuEntity } from '../../api/menu.js';

export interface Props extends PropsBase<ControllerLayoutDefault, Slots> {}

export type Emits = {};

export interface Slots {}

@Controller()
export class ControllerLayoutDefault extends BeanControllerBase {
  static $propsDefault = {};

  @Use()
  $$modelMenu: ModelMenu;

  menuTree?: MenuItemGroupType;

  activeMenuItemKeys: string[];
  activeMenuSubKeys: string[];

  protected async __init__() {
    const route = useRoute();
    // menuTree
    this.menuTree = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return;
      return this._prepareMenuItems(data);
    });
    this.activeMenuItemKeys = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return [];
      return this._calcActiveMenuItemKeys(data, route);
    });
    this.activeMenuSubKeys = useComputed(() => {
      const { data } = this.$$modelMenu.select();
      if (!data) return [];
      return this._calcActiveMenuSubKeys(data);
    });
    // // menu
    // const queryMenus = this.$$modelMenu.select();
    // await queryMenus.suspense();
    // if (queryMenus.error) throw queryMenus.error;
  }

  private _prepareMenuItems(menuItemsSrc: ApiMenuEntity[]): MenuItemGroupType {
    const tree: Tree<'children'> = {
      key: '',
      children: menuItemsSrc,
    };
    return TreeLodash.map(tree, (menuItemSrc, meta) => {
      if (meta.depth === 0) return { key: menuItemSrc.key };
      // key
      const menuItem = {
        key: menuItemSrc.key,
        icon: () => iconh(menuItemSrc.icon as any),
        label: menuItemSrc.title,
        title: menuItemSrc.title,
        data: menuItemSrc,
      };
      return menuItem;
    }) as MenuItemGroupType;
  }

  private _calcActiveMenuItemKeys(menuItemsSrc: ApiMenuEntity[], route: RouteLocationNormalizedLoaded) {
    const tree: Tree<'children'> = {
      key: '',
      children: menuItemsSrc,
    };
    const menuItem = TreeLodash.find(tree, menuItemSrc => {
      return menuItemSrc.to === route.path;
    });
    return menuItem ? [menuItem.key] : [];
  }

  private _calcActiveMenuSubKeys(menuItemsSrc: ApiMenuEntity[]) {
    const tree: Tree<'children'> = {
      key: '',
      children: menuItemsSrc,
    };
    const menuItem = TreeLodash.find(tree, menuItemSrc => {
      return menuItemSrc.children && !!menuItemSrc.children.find(item => this.activeMenuItemKeys.includes(item.key));
    });
    return menuItem ? [menuItem.key] : [];
  }

  onMenuItemClick(event) {
    const data: ApiMenuEntity = event.item.data;
    if (data.href) {
      window.open(data.href);
    } else {
      this.$router.push(data.to!);
    }
  }
}
