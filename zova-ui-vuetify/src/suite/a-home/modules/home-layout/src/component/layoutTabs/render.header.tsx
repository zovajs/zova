import type { RenderLayoutTabs } from './render.jsx';
import { VAppBar, VAppBarNavIcon, VBtn, VIcon, VSpacer, VTab, VTabs, VToolbarTitle } from 'vuetify/components';
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
      <VAppBar style={{ transition: 'none' }} v-slots={slots}>
        <VAppBarNavIcon icon="::menu" variant="text" nativeOnClick={() => this.toggleLeftDrawer()}></VAppBarNavIcon>
        <VToolbarTitle>Zova</VToolbarTitle>

        <VSpacer></VSpacer>
        <VBtn icon="::search" variant="text"></VBtn>
        <VBtn icon="::more-horiz" variant="text"></VBtn>
      </VAppBar>
    );
  }
}
