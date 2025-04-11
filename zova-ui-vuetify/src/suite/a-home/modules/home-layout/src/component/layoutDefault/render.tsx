import { VNode } from 'vue';
import { RouterView } from 'vue-router';
import {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VBtn,
  VDivider,
  VList,
  VListSubheader,
  VMain,
  VNavigationDrawer,
  VSpacer,
  VToolbarTitle,
} from 'vuetify/components';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ApiMenuEntity } from '../../api/menu.js';
import EssentialLink from '../essentialLink/index.vue';

@Render()
export class RenderLayoutDefault extends BeanRenderBase {
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
