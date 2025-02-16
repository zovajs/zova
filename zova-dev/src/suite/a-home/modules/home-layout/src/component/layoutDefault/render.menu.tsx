import type { VNode } from 'vue';
import type { ApiMenuEntity } from '../../api/menu.js';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZEssentialLink } from '../../.metadata/index.js';

@Render()
export class RenderMenu extends BeanRenderBase {
  _renderMenuItem(item: ApiMenuEntity) {
    const titleLocale = this.$text(item.title);
    if (item.separator) {
      return <li></li>;
    }
    if (item.folder) {
      return (
        <li>
          <h2 class="menu-title">{titleLocale}</h2>
          <ul>{this._renderMenuItems(item.children)}</ul>
        </li>
      );
    }
    return (
      <li key={item.title}>
        <ZEssentialLink title={titleLocale} caption={item.caption} icon={item.icon} href={item.href} to={item.to} />
      </li>
    );
  }

  _renderMenuItems(items?: ApiMenuEntity[]) {
    if (!items) return;
    const domItems: VNode[] = [];
    for (const item of items) {
      domItems.push(this._renderMenuItem(item));
    }
    return domItems;
  }

  public render() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading || !queryMenus.data) return;
    const domItems = this._renderMenuItems(queryMenus.data);
    return <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">{domItems}</ul>;
  }
}
