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
        const data = await this.$api.homeBaseMenu.retrieveMenus({ params: { publicPath: this.sys.config.app.publicPath } });
        const menus = data.menus?.map(item => {
          if (item.link && !this.$router.isRouterName(item.link) && item.meta?.params) {
            const link = this.sys.util.apiActionPathTranslate(item.link, item.meta?.params);
            return { ...item, link };
          }
          return item;
        })?.filter(item => {
          return !item.external || this.$router.checkPathValid(item.link);
        });
        return { ...data, menus };
      },
    });
  }

  findMenuItem(search: { name?: string; link?: string }): ApiSchemaAMenuDtoMenuItem | undefined {
    const menus = this.retrieveMenus().data;
    if (!menus || !menus.menus) return;
    return menus.menus.find(item => (item.name && search.name && item.name === search.name) || item.link === search.link);
  }

  private _prepareMenuTree(menus: ApiSchemaAMenuDtoMenus, groupName?: string): TypeMenuTree {
    let children: TypeMenuItem[] = [];
    if (menus.menus) {
      children = children.concat(
        menus.menus?.filter(item => item.group === groupName || (Array.isArray(item.group) && item.group.includes(groupName!))).map(item => {
          return { ...item, folder: false };
        }),
      );
    }
    if (menus.groups) {
      const groups = menus.groups.filter(item => item.group === groupName || (Array.isArray(item.group) && item.group.includes(groupName!)))
        .map(menuGroup => {
          return Object.assign({}, menuGroup, { folder: true, children: this._prepareMenuTree(menus, menuGroup.name) });
        });
      children = children.concat(groups);
    }
    return children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
}
