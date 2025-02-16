import type { RenderContent } from './render.content.jsx';
import type { RenderHeader } from './render.header.jsx';
import type { RenderLocale } from './render.locale.jsx';
import type { RenderMenu } from './render.menu.jsx';
import type { RenderSidebar } from './render.sidebar.jsx';
import type { RenderTabs } from './render.tabs.jsx';
import type { RenderTheme } from './render.theme.jsx';
import type { RenderUser } from './render.user.jsx';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderLayoutDefault extends BeanRenderBase {
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

  public render() {
    return (
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {this.$$renderHeader.render()}
          {this.$$renderContent.render()}
        </div>
        {this.$$renderSidebar.render()}
      </div>
    );
  }
}
