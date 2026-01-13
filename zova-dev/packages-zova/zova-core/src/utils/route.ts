import type { RouteLocationNormalizedLoaded } from '@cabloy/vue-router';
import type { PropType, Slot } from 'vue';
import { RouterView as RouterViewRaw } from '@cabloy/vue-router';
import { defineComponent, h } from 'vue';

export const pageRouteKey = '$$pageRoute';

export const RouterView = defineComponent({
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
        const vnode = normalizeSlot(slots.default, component) || h(component.Component);
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
