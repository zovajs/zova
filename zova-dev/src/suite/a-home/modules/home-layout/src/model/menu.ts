import { useComputed } from 'zova-core';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { ApiSchemaAMenuDtoMenuGroup, ApiSchemaAMenuDtoMenuItem, ApiSchemaAMenuDtoMenus } from 'zova-module-home-api';

export type TypeMenuGroup = ApiSchemaAMenuDtoMenuGroup & { folder: true; children: TypeMenuItem[] };
export type TypeMenuItem = (ApiSchemaAMenuDtoMenuItem & { folder: false }) | TypeMenuGroup;
export type TypeMenuTree = TypeMenuItem[];

@Model()
export class ModelMenu extends BeanModelBase {
  menuTree?: TypeMenuTree;

  protected async __init__() {
    this.menuTree = useComputed(() => {
      const queryMenus = this.retrieveMenus();
      if (!queryMenus.data) return;
      return this._prepareMenuTree(queryMenus.data);
    });
  }

  retrieveMenus() {
    return this.$useStateData({
      queryKey: ['retrieveMenus'],
      queryFn: async () => {
        const data = await this.$api.homeBaseMenu.retrieveMenus();
        const items = data.items?.filter(item => {
          return !item.external || this.$router.checkPathValid(item.link);
        });
        return { ...data, items };
      },
    });
  }

  findMenuItem(search: { id?: string; link?: string }): ApiSchemaAMenuDtoMenuItem | undefined {
    const menus = this.retrieveMenus().data;
    if (!menus || !menus.items) return;
    return menus.items.find(item => item.id === search.id || item.link === search.link);
  }

  private _prepareMenuTree(menus: ApiSchemaAMenuDtoMenus, groupId?: string): TypeMenuTree {
    let children: TypeMenuItem[] = [];
    if (menus.items) {
      children = children.concat(
        menus.items?.filter(item => item.group === groupId || (Array.isArray(item.group) && item.group.includes(groupId!))).map(item => {
          return { ...item, folder: false };
        }),
      );
    }
    if (menus.groups) {
      const groups = menus.groups.filter(item => item.group === groupId || (Array.isArray(item.group) && item.group.includes(groupId!)))
        .map(menuGroup => {
          return Object.assign({}, menuGroup, { folder: true, children: this._prepareMenuTree(menus, menuGroup.id) });
        });
      children = children.concat(groups);
    }
    return children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
}
