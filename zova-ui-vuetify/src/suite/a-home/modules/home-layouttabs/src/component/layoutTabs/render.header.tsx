import { VAppBar, VAppBarNavIcon, VSpacer, VToolbarTitle } from 'vuetify/components';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

import type { RenderLayoutTabs } from './render.jsx';

@Render()
export class RenderHeader extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutTabs;

  public render() {
    const slots = {
      extension: () => {
        return this.$$r.$$renderTabs.renderTabs();
      },
    };
    return (
      <VAppBar style={{ transition: 'none' }} extended={true} v-slots={slots}>
        <VAppBarNavIcon icon="::menu" variant="text" nativeOnClick={() => this.toggleLeftDrawer()}></VAppBarNavIcon>
        <VToolbarTitle>{this.sys.env.APP_TITLE}</VToolbarTitle>
        {this.$$r.$$renderTabs.renderTabItems()}
        <VSpacer></VSpacer>
        {this.$$r.$$renderLocale.render()}
        {this.$$r.$$renderTheme.renderThemeDark()}
        {this.sys.config.ssr.cookie && this.$$r.$$renderTheme.renderThemeName()}
        {this.$$r.$$renderUser.render()}
      </VAppBar>
    );
  }
}
