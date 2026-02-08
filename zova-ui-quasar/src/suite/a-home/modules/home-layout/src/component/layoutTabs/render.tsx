import { QBtn, QDrawer, QHeader, QLayout, QPageContainer, QToolbar, QToolbarTitle } from 'quasar';
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

  public render() {
    return (
      <QLayout view="lHh Lpr lFf">
        <QHeader elevated>
          <QToolbar>
            <QBtn flat dense round icon="::menu" aria-label="Menu" onClick={() => this.toggleLeftDrawer()} />

            <QToolbarTitle> Quasar App </QToolbarTitle>

            <div>{`Quasar v${this.$q.version}`}</div>
          </QToolbar>
        </QHeader>

        <QDrawer v-model={this.leftDrawerOpen} breakpoint={this.sys.config.layout.sidebar.breakpoint} bordered>
          {this.$$renderMenu.render()}
        </QDrawer>

        <QPageContainer>
          {this.$$renderContent.render()}
        </QPageContainer>
        <div class="__ssr_placeholder__"></div>
      </QLayout>
    );
    // return (
    //   <div class="drawer lg:drawer-open">
    //     <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    //     <div class="drawer-content">
    //       {this.$$renderHeader.render()}
    //       {this.$$renderContent.render()}
    //     </div>
    //     {this.$$renderSidebar.render()}
    //   </div>
    // );
  }
}
