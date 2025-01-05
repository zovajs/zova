import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleLayoutDefault } from './style.js';
import { RenderTabs } from './renderTabs.jsx';
import { RenderTheme } from './renderTheme.jsx';
import { RenderLocale } from './renderLocale.jsx';
import { RenderUser } from './renderUser.jsx';
import { RenderSidebar } from './renderSidebar.jsx';
import { RenderHeader } from './renderHeader.jsx';
import { RenderContent } from './renderContent.jsx';
import { RenderMenu } from './renderMenu.jsx';

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
