import { useComputed } from 'zova-core';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { ApiSchemaAMenuDtoMenuItem } from 'zova-module-home-api';

@Model()
export class ModelMenu extends BeanModelBase {
  menuTree: any;

  protected async __init__() {
    this.menuTree = useComputed(() => {
      const queryMenus = this.retrieveMenus();
      if (!queryMenus.data) return;
      const items = queryMenus.data.items?.filter(item => {
        return { ...item, title: `${item.title}!!` };
      });
      return { ...queryMenus.data, items };
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
}
