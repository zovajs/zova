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
    const slots = {
      extension: () => {
        return (
          <VTabs alignTabs="start" centerActive showArrows={true}>
            <VTab>
              <VIcon icon="::add"></VIcon>
              One
            </VTab>
            <VTab v-slots={{ append: () => <div>sss</div> }}>Two1</VTab>
            <VTab>Two2</VTab>
            <VTab>Two3</VTab>
            <VTab>Two4</VTab>
            <VTab>Two5</VTab>
            <VTab>Two6</VTab>
            <VTab>Two7</VTab>
          </VTabs>
        );
      },
    };
    return (
      <VApp>
        {this.$$renderSidebar.render()}
        <VAppBar style={{ transition: 'none' }} v-slots={slots}>
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
