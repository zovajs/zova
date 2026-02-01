import type { VNode } from 'vue';
import { QItemLabel, QList, QSeparator } from 'quasar';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { TypeMenuItem, TypeMenuTree, ZEssentialLink } from '../../.metadata/index.js';

@Render()
export class RenderMenu extends BeanRenderBase {
  _renderMenuItem(item: TypeMenuItem) {
    const titleLocale = this.$text(item.title ?? '');
    if (item.folder) {
      return <QItemLabel header>{titleLocale}</QItemLabel>;
      // return (
      //   <li>
      //     <h2 class="menu-title">{titleLocale}</h2>
      //     <ul>{this._renderMenuItems(item.children)}</ul>
      //   </li>
      // );
    }
    if (item.separator) {
      return <QSeparator spaced></QSeparator>;
    }
    let to: any;
    if (!item.external) {
      to = {};
      if (this.$router.isRouterName(item.link)) {
        to.name = item.link;
      } else {
        to.path = item.link;
      }
      if (item.meta?.params && to.name) {
        to.params = item.meta?.params;
      }
      if (item.meta?.query) to.query = item.meta?.query;
    }
    return (
      <ZEssentialLink
        key={item.title}
        title={titleLocale}
        description={item.description}
        icon={item.icon as any}
        href={item.external ? item.link : undefined}
        to={to}
      />
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
    return <QList>{domItems}</QList>;
  }
}
