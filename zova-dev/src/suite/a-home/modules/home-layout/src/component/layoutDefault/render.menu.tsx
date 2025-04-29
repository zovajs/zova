import type { VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { TypeMenuItem, TypeMenuTree, ZEssentialLink } from '../../.metadata/index.js';

@Render()
export class RenderMenu extends BeanRenderBase {
  _renderMenuItem(item: TypeMenuItem) {
    const titleLocale = this.$text(item.title ?? '');
    if (item.folder) {
      return (
        <li>
          <h2 class="menu-title">{titleLocale}</h2>
          <ul>{this._renderMenuItems(item.children)}</ul>
        </li>
      );
    }
    if (item.separator) {
      return <li></li>;
    }
    const to: any = { query: {} };
    if (!item.external) {
      if (this.$router.isRouterName(item.link)) {
        to.path = item.link;
      } else {
        to.name = item.link;
      }
      if (item.meta?.api) {
        to.query.api = item.meta?.api;
      }
      if (item.meta?.controller) {
        to.query.controller = item.meta?.controller;
      }
    }
    return (
      <li key={item.title}>
        <ZEssentialLink
          title={titleLocale}
          description={item.description}
          icon={item.icon}
          href={item.external ? item.link : undefined}
          to={to}
        />
      </li>
    );
  }

  _renderMenuItems(items?: TypeMenuTree) {
    if (!items) return;
    const domItems: VNode[] = [];
    for (const item of items) {
      domItems.push(this._renderMenuItem(item));
    }
    return domItems;
  }

  public render() {
    const menuTree = this.$$modelMenu.menuTree;
    if (!menuTree) return;
    const domItems = this._renderMenuItems(menuTree);
    return <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">{domItems}</ul>;
  }
}
