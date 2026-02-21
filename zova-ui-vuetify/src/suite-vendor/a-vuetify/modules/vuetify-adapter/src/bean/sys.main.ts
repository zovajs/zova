import { createElementVNode, createVNode } from 'vue';
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
    // const self = this;
    VMain.setup = function (props, { slots }) {
      const { dimensionStyles } = useDimension(props);
      const { mainStyles } = useLayout();
      const { ssrBootStyles } = useSsrBoot();
      useRender(() => {
        let mainStylesPatch;
        if (process.env.CLIENT && process.env.SSR && cast(window).__mainStyleLayoutTop) {
          mainStylesPatch = {
            '--v-layout-bottom': mainStyles.value['--v-layout-bottom'],
            '--v-layout-left': cast(window).__mainStyleLayoutLeft,
            '--v-layout-right': mainStyles.value['--v-layout-right'],
            '--v-layout-top': cast(window).__mainStyleLayoutTop,
          };
          setTimeout(() => {
            delete cast(window).__mainStyleLayoutLeft;
            delete cast(window).__mainStyleLayoutTop;
          }, 100);
        } else {
          mainStylesPatch = mainStyles.value;
        }
        return createVNode(props.tag, {
          class: ['v-main', {
            'v-main--scrollable': props.scrollable,
          }, props.class],
          style: [mainStylesPatch, ssrBootStyles.value, dimensionStyles.value, props.style],
        }, {
          default: () => [props.scrollable
            ? createElementVNode('div', {
                class: 'v-main__scroller',
              }, [slots.default?.()])
            : slots.default?.()],
        });
      });
      return {};
    };
  }
}
