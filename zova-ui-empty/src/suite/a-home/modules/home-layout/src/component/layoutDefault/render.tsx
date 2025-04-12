import { RouterView } from '@cabloy/vue-router';
import { VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ApiMenuEntity } from '../../api/menu.js';
import EssentialLink from '../essentialLink/index.vue';

@Render()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ApiMenuEntity) {
    if (item.separator) {
      return <div class="menu-separator"> - - - </div>;
    }
    if (item.folder) {
      return <div class="menu-folder">{item.title}</div>;
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
    return <div class={this.cMenuList}>{domItems}</div>;
  }

  render() {
    return (
      <div>
        <div>{this._renderMenu()}</div>
        <div>
          <RouterView />
        </div>
      </div>
    );
  }
}
