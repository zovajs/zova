import { CSSProperties, ref, Ref } from 'vue';
import { VMain } from 'vuetify/components/VMain';
import { useDimension } from 'vuetify/lib/composables/dimensions.mjs';
import { useLayout } from 'vuetify/lib/composables/layout.mjs';
import { useSsrBoot } from 'vuetify/lib/composables/ssrBoot.mjs';
import { useRender } from 'vuetify/lib/util/useRender.mjs';
import { BeanBase, cast } from 'zova';
import { Sys } from 'zova-module-a-bean';

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
      const timeout = ref(null);

      useRender(() => {
        const mainStylesPatch = _layoutStylePatch(mainStyles, timeout);
        return (
          <props.tag
            class={[
              'v-main',
              { 'v-main--scrollable': props.scrollable },
              props.class,
            ]}
            style={[
              mainStylesPatch,
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

function _layoutStylePatch(mainStyles: Ref<CSSProperties, CSSProperties>, timeout: Ref) {
  let mainStylesPatch;
  if (process.env.CLIENT && process.env.SSR && cast(window).__mainStyleLayoutTop) {
    mainStylesPatch = Object.assign(
      {},
      mainStyles.value,
      {
        '--v-layout-left': cast(window).__mainStyleLayoutLeft,
        '--v-layout-top': cast(window).__mainStyleLayoutTop,
      },
    );
    if (!timeout.value) {
      timeout.value = setTimeout(() => {
        delete cast(window).__mainStyleLayoutLeft;
        delete cast(window).__mainStyleLayoutTop;
      }, 100);
    }
  } else {
    mainStylesPatch = mainStyles.value;
  }
  return mainStylesPatch;
}
