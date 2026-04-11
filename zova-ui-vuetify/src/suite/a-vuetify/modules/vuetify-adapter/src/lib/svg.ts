import { defineComponent } from 'vue';
import { createVNode as _createVNode, mergeProps as _mergeProps } from 'vue';
import { makeIconProps } from 'vuetify/lib/composables/icons.js';
import { ZIcon } from 'zova-module-a-icon';

export const VSvgIconZova = defineComponent({
  name: 'VSvgIconZova',
  inheritAttrs: false,
  props: makeIconProps(),
  setup(props, _ref2) {
    const { attrs } = _ref2;
    return () => {
      return _createVNode(
        props.tag,
        _mergeProps(attrs, {
          style: null,
        }),
        {
          default: () => [
            _createVNode(ZIcon, {
              href: props.icon,
            }),
          ],
        },
      );
    };
  },
});
