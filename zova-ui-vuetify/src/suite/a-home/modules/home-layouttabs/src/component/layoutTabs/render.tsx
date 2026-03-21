import { VApp } from 'vuetify/components';
import { VMain } from 'vuetify/components';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

import { RenderContent } from './render.content.jsx';
import { RenderHeader } from './render.header.jsx';
import { RenderLocale } from './render.locale.jsx';
import { RenderMenu } from './render.menu.jsx';
import { RenderSidebar } from './render.sidebar.jsx';
import { RenderTabs } from './render.tabs.jsx';
import { RenderTheme } from './render.theme.jsx';
import { RenderUser } from './render.user.jsx';

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

  @Use()
  $$renderTheme: RenderTheme;

  @Use()
  $$renderLocale: RenderLocale;

  @Use()
  $$renderUser: RenderUser;

  render() {
    return (
      <VApp>
        {this.$$renderSidebar.render()}
        {this.$$renderHeader.render()}
        <VMain style={{ transition: 'none' }}>{this.$$renderContent.render()}</VMain>
      </VApp>
    );
  }
}
