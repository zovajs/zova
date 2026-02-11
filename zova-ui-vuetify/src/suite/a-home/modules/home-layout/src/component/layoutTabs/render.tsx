import { VIcon, VTab, VTabs } from 'vuetify/components';
import { VApp } from 'vuetify/components/VApp';
import { VAppBar, VAppBarNavIcon } from 'vuetify/components/VAppBar';
import { VBtn } from 'vuetify/components/VBtn';
import { VSpacer } from 'vuetify/components/VGrid';
import { VMain } from 'vuetify/components/VMain';
import { VToolbarTitle } from 'vuetify/components/VToolbar';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
import { RenderContent } from './render.content.jsx';
import { RenderHeader } from './render.header.jsx';
import { RenderMenu } from './render.menu.jsx';
import { RenderSidebar } from './render.sidebar.jsx';
import { RenderTabs } from './render.tabs.jsx';

@Render()
export class RenderLayoutTabs extends BeanRenderBase {
  @Use()
  $$renderHeader: RenderHeader;

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
        {this.$$renderSidebar.render()}
        {this.$$renderHeader.render()}
        <VMain style={{ transition: 'none' }}>
          {this.$$renderContent.render()}
        </VMain>
      </VApp>
    );
  }
}
