import type { RenderLayoutTabs } from './render.jsx';
import { VAppBar, VAppBarNavIcon, VSpacer, VToolbarTitle } from 'vuetify/components';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

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
        <VToolbarTitle>Zova</VToolbarTitle>
        {this.$$r.$$renderTabs.renderTabItems()}
        <VSpacer></VSpacer>
        {this.$$r.$$renderLocale.render()}
        {this.$$r.$$renderTheme.renderThemeDark()}
        {this.$$scopeSsr.config.cookieTheme && this.$$r.$$renderTheme.renderThemeName()}
        {this.$$r.$$renderUser.render()}
      </VAppBar>
    );
  }
}
