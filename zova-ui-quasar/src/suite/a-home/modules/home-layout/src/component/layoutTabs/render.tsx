import { QBtn, QDrawer, QHeader, QLayout, QPageContainer, QToolbar, QToolbarTitle } from 'quasar';
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

        <QPageContainer>{this.$$renderContent.render()}</QPageContainer>
        <div class="__ssr_placeholder__"></div>
      </QLayout>
    );
  }
}
