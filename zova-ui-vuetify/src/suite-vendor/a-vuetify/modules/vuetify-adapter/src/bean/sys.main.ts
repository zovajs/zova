import { createElementVNode, createVNode, normalizeClass } from 'vue';
import { useLayout } from 'vuetify';
import { VMain } from 'vuetify/components';
import { useDimension } from 'vuetify/lib/composables/dimensions.mjs';
import { useSsrBoot } from 'vuetify/lib/composables/ssrBoot.mjs';
import { useRender } from 'vuetify/lib/util/useRender.mjs';
import { BeanBase } from 'zova';
import { Sys } from 'zova-module-a-bean';

@Sys()
export class SysMain extends BeanBase {
  public async initialize() {
    this._patchSetup();
  }

  private _patchSetup() {
    // const self = this;
    VMain.setup = function (props, { slots }) {
      const {
        dimensionStyles,
      } = useDimension(props);
      const {
        mainStyles,
      } = useLayout();
      const {
        ssrBootStyles,
      } = useSsrBoot();
      useRender(() => createVNode(props.tag, {
        class: normalizeClass(['v-main', {
          'v-main--scrollable': props.scrollable,
        }, props.class]),
        style: normalizeClass([mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style]),
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
