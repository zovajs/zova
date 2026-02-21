import { computed, CSSProperties, inject, Ref } from 'vue';
import { VMain } from 'vuetify/components/VMain';
import { useDimension } from 'vuetify/lib/composables/dimensions.mjs';
import { useLayout } from 'vuetify/lib/composables/layout.mjs';
import { useSsrBoot } from 'vuetify/lib/composables/ssrBoot.mjs';
import { useRender } from 'vuetify/lib/util/useRender.mjs';
import { BeanBase } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { ILayoutConfig } from '../types/layoutConfig.js';

@Sys()
export class SysMain extends BeanBase {
  public async initialize() {
    this._patchSetup();
  }

  private _patchSetup() {
    VMain.setup = function (props, { slots }) {
      const { dimensionStyles } = useDimension(props);
      const { mainStyles } = useLayout();
      const { ssrBootStyles } = useSsrBoot();
      const mainStylesPatch = useLayoutStylePatch(mainStyles);

      useRender(() => {
        return (
          <props.tag
            class={[
              'v-main',
              { 'v-main--scrollable': props.scrollable },
              props.class,
            ]}
            style={[
              mainStylesPatch.value,
              ssrBootStyles.value,
              dimensionStyles.value,
              props.style,
            ]}
          >
            { props.scrollable
              ? (
                  <div class="v-main__scroller">
                    { slots.default?.() }
                  </div>
                )
              : slots.default?.()}
          </props.tag>
        );
      });

      return {};
    };
  }
}

function useLayoutStylePatch(mainStyles: Ref<CSSProperties, CSSProperties>) {
  const layoutConfigRef = inject('VuetifyLayoutConfig', undefined) as Ref<ILayoutConfig> | undefined;
  return computed(() => {
    let mainStylesPatch;
    if (process.env.SSR && layoutConfigRef?.value) {
      if (layoutConfigRef.value.leftDrawerOpen) {
        mainStylesPatch = Object.assign(
          {},
          mainStyles.value,
          {
            '--v-layout-left': `${layoutConfigRef.value.sidebar.width}px`,
            '--v-layout-top': `${layoutConfigRef.value.navbar.height}px`,
          },
        );
      } else {
        mainStylesPatch = Object.assign(
          {},
          mainStyles.value,
          {
            '--v-layout-top': `${layoutConfigRef.value.navbar.height}px`,
          },
        );
      }
    } else {
      mainStylesPatch = mainStyles.value;
    }
    return mainStylesPatch;
  });
}
