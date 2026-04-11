import { computed, createCommentVNode, createVNode, normalizeClass, normalizeStyle, onServerPrefetch, shallowRef } from 'vue';
import { useTheme } from 'vuetify';
import { VIcon } from 'vuetify/components';
import { useTextColor } from 'vuetify/lib/composables/color.js';
import { useIcon } from 'vuetify/lib/composables/icons.js';
import { useSize } from 'vuetify/lib/composables/size.js';
import { convertToUnit, flattenFragments, useRender } from 'vuetify/lib/util/index.js';
import { BeanBase, isHttpUrl, useApp } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { $getZovaIcon } from 'zova-module-a-icon';

import { VSvgIconZova } from '../lib/svg.js';

@Sys()
export class SysIcon extends BeanBase {
  public async initialize() {
    this._patchSetup();
  }

  private _patchSetup() {
    const self = this;
    VIcon.setup = function (props, { attrs, slots }) {
      onServerPrefetch(async () => {
        let [iconName] = self._parseNameFromSlotDefault(slots);
        iconName = iconName || props.icon;
        if (!iconName) {
          return;
        }
        const app = useApp();
        const $$toolIcon = await app.bean._getBean('a-icon.tool.icon', true);
        await $$toolIcon.parseIconInfo(iconName);
      });

      const slotIcon = shallowRef();
      const { themeClasses } = useTheme();
      const { sizeClasses } = useSize(props);
      const { textColorClasses, textColorStyles } = useTextColor(() => props.color);
      const iconDefault = useIcon(() => slotIcon.value || props.icon);
      const iconV = computed(() => {
        return self._getIconData(slotIcon.value || props.icon) ?? iconDefault;
      });
      useRender(() => {
        if (!slotIcon.value && !props.icon) return createCommentVNode();
        const { iconData } = iconV.value;
        const slotValue = slots.default?.();
        if (slotValue) {
          slotIcon.value = flattenFragments(slotValue).filter(
            node => node.type === Text && node.children && typeof node.children === 'string',
          )[0]?.children;
        }
        const hasClick = !!(attrs.onClick || attrs.onClickOnce);
        return createVNode(
          iconData.value.component,
          {
            'tag': props.tag,
            'icon': iconData.value.icon,
            'class': normalizeClass([
              'v-icon',
              'notranslate',
              themeClasses.value,
              sizeClasses.value,
              textColorClasses.value,
              {
                'v-icon--clickable': hasClick,
                'v-icon--disabled': props.disabled,
                'v-icon--start': props.start,
                'v-icon--end': props.end,
              },
              props.class,
            ]),
            'style': normalizeStyle([
              {
                '--v-icon-opacity': props.opacity,
              },
              !sizeClasses.value
                ? {
                    fontSize: convertToUnit(props.size),
                    height: convertToUnit(props.size),
                    width: convertToUnit(props.size),
                  }
                : undefined,
              textColorStyles.value,
              props.style,
            ]),
            'role': hasClick ? 'button' : undefined,
            'aria-hidden': !hasClick,
            'tabindex': hasClick ? (props.disabled ? -1 : 0) : undefined,
          },
          {
            default: () => [slotValue],
          },
        );
      });
      return {};
    };
  }

  private _getIconData(iconName) {
    if (isHttpUrl(iconName)) {
      return {
        iconData: {
          value: {
            component: VSvgIconZova,
            icon: iconName,
          },
        },
      };
    }
    const iconInfo = $getZovaIcon(iconName);
    if (!iconInfo) return;
    return {
      iconData: {
        value: {
          component: VSvgIconZova,
          icon: `#${iconInfo.symbolId}`,
        },
      },
    };
  }

  private _parseNameFromSlotDefault(slots) {
    if (!slots.default) return [undefined, null];
    const slotDefault = slots.default();
    if (!slotDefault) return [undefined, null];
    const icons = flattenFragments(slotDefault).filter(node => node.type === Text && node.children && typeof node.children === 'string');
    const iconName = icons[0]?.children as string;
    return [iconName, slotDefault];
  }
}
