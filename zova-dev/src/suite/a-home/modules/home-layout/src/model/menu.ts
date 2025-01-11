import { BeanModelBase, Model } from 'zova-module-a-model';
import { ApiMenuEntity } from '../api/menu.js';

@Model()
export class ModelMenu extends BeanModelBase {
  select() {
    return this.$useQueryExisting({
      queryKey: ['select'],
      queryFn: async () => {
        const data = await this.scope.api.menu.select();
        return data.filter(item => {
          if (item.children) {
            item.children = item.children.filter(item => {
              return this.$router.checkPathValid(item.to);
            });
            return item.children.length > 0;
          }
          return this.$router.checkPathValid(item.to);
        });
      },
    });
  }

  findMenuItem(key: string): ApiMenuEntity | undefined {
    const menu = this.select().data;
    if (!menu) return;
    return this._findMenuItem(key, menu);
  }

  _findMenuItem(key: string, items: ApiMenuEntity[]): ApiMenuEntity | undefined {
    for (const item of items) {
      let menuItem;
      if (item.children) {
        menuItem = this._findMenuItem(key, item.children);
      } else {
        if (item.to && typeof item.to === 'object') {
          menuItem = item.to.name === key ? item : undefined;
        } else {
          menuItem = item.to === key ? item : undefined;
        }
      }
      if (menuItem) return menuItem;
    }
  }
}
