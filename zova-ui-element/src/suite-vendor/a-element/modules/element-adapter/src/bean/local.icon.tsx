import { ElIcon } from 'element-plus';
import { useNamespace } from 'element-plus/es/hooks/use-namespace/index.mjs';
import { addUnit } from 'element-plus/es/utils/dom/style.mjs';
import { isUndefined } from 'element-plus/es/utils/types.mjs';
import { computed, createVNode, mergeProps, onServerPrefetch, Text, unref } from 'vue';
import { $getZovaIcon, BeanBase, useApp, ZIcon } from 'zova';
import { Service } from 'zova-module-a-bean';

@Service()
export class ServiceIcon extends BeanBase {
  public async initialize() {
    this._patchSetup();
  }

  _patchSetup() {
    const self = this;
    ElIcon.setup = function (props, { attrs, slots }) {
      onServerPrefetch(async () => {
        const [iconName] = self._parseNameFromSlotDefault(slots);
        if (!iconName) {
          return;
        }
        const app = useApp();
        await app.meta.icon.parseIconInfo(iconName);
      });

      const ns = useNamespace('icon');
      const style = computed(() => {
        const { size, color } = props;
        if (!size && !color) return {};
        return {
          'fontSize': isUndefined(size) ? void 0 : addUnit(size),
          '--color': color,
        };
      });
      return () => {
        return createVNode(
          'i',
          mergeProps(
            {
              class: unref(ns).b(),
              style: unref(style),
            },
            attrs,
          ),
          [self._renderSlotDefault(slots)],
        );
      };
    };
  }

  private _renderSlotDefault(slots) {
    const [iconName, slotDefault] = this._parseNameFromSlotDefault(slots);
    if (!iconName) return slotDefault;
    const iconInfo = $getZovaIcon(iconName, this.app);
    if (iconInfo === undefined) return slotDefault;
    return <ZIcon href={`#${iconInfo.symbolId}`}></ZIcon>;
  }

  private _parseNameFromSlotDefault(slots) {
    if (!slots.default) return [undefined, null];
    const slotDefault = slots.default()[0];
    const type = slotDefault.type;
    if (typeof type !== 'string' && type !== Text) return [undefined, slotDefault];
    const iconName = typeof type === 'string' ? type : slotDefault.children;
    return [iconName, slotDefault];
  }
}
