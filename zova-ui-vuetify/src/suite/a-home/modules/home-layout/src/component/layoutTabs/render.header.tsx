import type { RenderLayoutTabs } from './render.jsx';
import { VAppBar, VAppBarNavIcon, VBtn, VSpacer, VToolbarTitle } from 'vuetify/components';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderHeader extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutTabs;

  public render() {
    const slots = {
      extension: () => {
        return this.$$r.$$renderTabs.render();
      },
    };
    return (
      <VAppBar style={{ transition: 'none' }} v-slots={slots}>
        <VAppBarNavIcon icon="::menu" variant="text" nativeOnClick={() => this.toggleLeftDrawer()}></VAppBarNavIcon>
        <VToolbarTitle>Zova</VToolbarTitle>
        <VSpacer></VSpacer>
        {this.$$r.$$renderLocale.render()}
        <VBtn icon="::search" variant="text"></VBtn>
        <VBtn icon="::more-horiz" variant="text"></VBtn>
      </VAppBar>
    );
  }
}
