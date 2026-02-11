import { VApp } from 'vuetify/components/VApp';
import { VMain } from 'vuetify/components/VMain';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
import { RenderContent } from './render.content.jsx';
import { RenderHeader } from './render.header.jsx';
import { RenderLocale } from './render.locale.jsx';
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

  @Use()
  $$renderLocale: RenderLocale;

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
