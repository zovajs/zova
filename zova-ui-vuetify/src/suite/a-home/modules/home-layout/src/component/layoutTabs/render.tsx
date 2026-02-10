import { VApp } from 'vuetify/components/VApp';
import { VAppBar, VAppBarNavIcon } from 'vuetify/components/VAppBar';
import { VBtn } from 'vuetify/components/VBtn';
import { VSpacer } from 'vuetify/components/VGrid';
import { VMain } from 'vuetify/components/VMain';
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer';
import { VToolbarTitle } from 'vuetify/components/VToolbar';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
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

  render() {
    return (
      <VApp>
        <VNavigationDrawer
          v-model={this.leftDrawerOpen}
          mobileBreakpoint={this.sys.config.layout.sidebar.breakpoint}
          width="360"
        >
          {this.$$renderMenu.render()}
        </VNavigationDrawer>
        <VAppBar>
          <VAppBarNavIcon icon="::menu" variant="text" nativeOnClick={() => this.toggleLeftDrawer()}></VAppBarNavIcon>
          <VToolbarTitle>Zova</VToolbarTitle>
          <VSpacer></VSpacer>
          <VBtn icon="::search" variant="text"></VBtn>
          <VBtn icon="::more-horiz" variant="text"></VBtn>
        </VAppBar>
        <VMain style={{ transition: 'none' }}>
          {this.$$renderContent.render()}
        </VMain>
      </VApp>
    );
  }
}
