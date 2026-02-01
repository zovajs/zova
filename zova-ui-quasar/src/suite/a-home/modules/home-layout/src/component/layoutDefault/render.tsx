import { RouterView } from '@cabloy/vue-router';
import {
  QBtn,
  QDrawer,
  QHeader,
  QItemLabel,
  QLayout,
  QList,
  QPageContainer,
  QSeparator,
  QToolbar,
  QToolbarTitle,
} from 'quasar';
import { VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ApiMenuEntity } from '../../api/menu.js';
import EssentialLink from '../../component/essentialLink/index.vue';

@Render()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ApiMenuEntity) {
    if (item.separator) {
      return <QSeparator spaced></QSeparator>;
    }
    if (item.folder) {
      return <QItemLabel header>{item.title}</QItemLabel>;
    }
    return (
      <EssentialLink
        key={item.title}
        title={item.title}
        caption={item.caption}
        icon={item.icon}
        href={item.href}
        to={item.to}
      />
    );
  }

  _renderMenu() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading || !queryMenus.data) return;
    const domItems: VNode[] = [];
    for (const item of queryMenus.data) {
      domItems.push(this._renderMenuItem(item));
    }
    return <QList>{domItems}</QList>;
  }

  render() {

  }
}
