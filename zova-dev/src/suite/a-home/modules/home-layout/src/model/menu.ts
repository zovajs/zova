import { BeanModelBase, Model } from 'zova-module-a-model';
import { ApiSchemaAMenuDtoMenuItem } from 'zova-module-home-api';

@Model()
export class ModelMenu extends BeanModelBase {
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
