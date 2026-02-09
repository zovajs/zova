import type { VNode } from 'vue';
import { VDivider } from 'vuetify/components/VDivider';
import { VList, VListSubheader } from 'vuetify/components/VList';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { TypeMenuItem, TypeMenuTree, ZItemLink } from '../../.metadata/index.js';

@Render()
export class RenderMenu extends BeanRenderBase {
  _renderMenuItem(item: TypeMenuItem) {
    const titleLocale = this.$text(item.title ?? '');
    if (item.folder) {
      let domChildren: VNode[] = [];
      domChildren.push(<VListSubheader key={`folder:${item.title}`}>{titleLocale}</VListSubheader>);
      const domChildren2 = this._renderMenuItems(item.children);
      if (domChildren2) {
        domChildren = domChildren.concat(domChildren2);
      }
      return domChildren;
    }
    if (item.separator) {
      return <VDivider></VDivider>;
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
      <ZItemLink
        key={item.title}
        title={titleLocale}
        description={item.description}
        icon={item.icon as any}
        href={item.external ? item.link : undefined}
        to={to}
      ></ZItemLink>
    );
  }

  _renderMenuItems(items?: TypeMenuTree) {
    if (!items) return;
    const domItems: VNode[] = [];
    for (const item of items) {
      const domChildren = this._renderMenuItem(item);
      if (Array.isArray(domChildren)) {
        domItems.push(...domChildren);
      } else {
        domItems.push(domChildren);
      }
    }
    return domItems;
  }

  public render() {
    const menuTree = this.$$modelMenu.menuTree;
    if (!menuTree) return;
    const domItems = this._renderMenuItems(menuTree);
    return <VList>{domItems}</VList>;
  }
}
