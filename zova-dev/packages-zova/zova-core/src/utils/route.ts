import type { RouteLocationNormalizedLoaded } from '@cabloy/vue-router';
import type { PropType, Slot } from 'vue';
import { RouterView as RouterViewRaw } from '@cabloy/vue-router';
import { defineComponent, h } from 'vue';
import { cast } from '../types/utils/cast.js';

export const pageRouteKey = '$$pageRoute';

export const RouterView1 = defineComponent({
  inheritAttrs: false,
  props: {
    name: {
      type: String as PropType<string>,
      default: 'default',
    },
    route: Object as PropType<RouteLocationNormalizedLoaded>,
  },
  setup(props, { slots }) {
    return () => {
      return h(RouterViewRaw, props, { default: component => {
        const vnode = normalizeSlot(slots.default, component) || (component.Component && h(component.Component)) || null;
        if (vnode) {
          cast(vnode).zovaHostProviders = { [pageRouteKey]: component.route };
        }
        return vnode;
      } });
    };
  },
});

function normalizeSlot(slot: Slot | undefined, data: any) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
