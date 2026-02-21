import { computed, createElementVNode, createVNode, normalizeClass, ref } from 'vue';
import { VMain } from 'vuetify/components/VMain';
import { useDimension } from 'vuetify/lib/composables/dimensions.mjs';
import { useLayout } from 'vuetify/lib/composables/layout.mjs';
import { useSsrBoot } from 'vuetify/lib/composables/ssrBoot.mjs';
import { useRender } from 'vuetify/lib/util/useRender.mjs';
import { BeanBase, useApp } from 'zova';
import { Sys } from 'zova-module-a-bean';

@Sys()
export class SysMain extends BeanBase {
  public async initialize() {
    this._patchSetup();
  }

  private _patchSetup() {
    // const self = this;
    VMain.setup = function (props, { slots }) {
      const { dimensionStyles } = useDimension(props);
      const { mainStyles } = useLayout();
      const { ssrBootStyles } = useSsrBoot();
      const app = useApp();
      const mainStylesPatch = computed(() => {
        if (process.env.CLIENT && app.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
          console.log(mainStyles);
          return ref({
            '--v-layout-bottom': '0px',
            '--v-layout-left': '0px',
            '--v-layout-right': '0px',
            '--v-layout-top': '112px',
          });
        }
        return mainStyles;
      });

      useRender(() => createVNode(props.tag, {
        class: normalizeClass(['v-main', {
          'v-main--scrollable': props.scrollable,
        }, props.class]),
        style: normalizeClass([mainStylesPatch.value, ssrBootStyles.value, dimensionStyles.value, props.style]),
      }, {
        default: () => [props.scrollable
          ? createElementVNode('div', {
              class: 'v-main__scroller',
            }, [slots.default?.()])
          : slots.default?.()],
      }));
      return {};
    };
  }
}
