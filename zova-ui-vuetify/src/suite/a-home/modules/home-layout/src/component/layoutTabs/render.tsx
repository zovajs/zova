import { RouterView } from '@cabloy/vue-router';
import { VNode } from 'vue';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ApiMenuEntity } from '../../api/menu.js';
import EssentialLink from '../essentialLink/index.vue';
import { RenderContent } from './render.content.jsx';
import { RenderMenu } from './render.menu.jsx';
import { RenderSidebar } from './render.sidebar.jsx';
import { RenderTabs } from './render.tabs.jsx';

@Render()
export class RenderLayoutTabs extends BeanRenderBase {
  @Use()
  $$renderContent: RenderContent;

  @Use()
  $$renderSidebar: RenderSidebar;

  @Use()
  $$renderMenu: RenderMenu;

  @Use()
  $$renderTabs: RenderTabs;

  _renderMenuItem(item: ApiMenuEntity) {
    if (item.separator) {
      return <VDivider></VDivider>;
    }
    if (item.folder) {
      return <VListSubheader>{item.title}</VListSubheader>;
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
    return <VList>{domItems}</VList>;
  }

  render() {
    return (
      <VApp>
        <VNavigationDrawer
          v-model={this.leftDrawerOpen}
          mobileBreakpoint={this.sys.config.layout.sidebar.breakpoint}
          width="360"
        >
          {this._renderMenu()}
        </VNavigationDrawer>
        <VAppBar>
          <VAppBarNavIcon icon="::menu" variant="text" onClick={() => this.toggleLeftDrawer()}></VAppBarNavIcon>
          <VToolbarTitle>Zova</VToolbarTitle>
          <VSpacer></VSpacer>
          <VBtn icon="::search" variant="text"></VBtn>
          <VBtn icon="::more-horiz" variant="text"></VBtn>
        </VAppBar>
        <VMain>
          <RouterView />
        </VMain>
      </VApp>
    );
  }
}
