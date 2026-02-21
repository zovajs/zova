import { computed, CSSProperties, inject, Ref, ref, shallowRef, toRef, watchEffect } from 'vue';
import { VAppBar, VToolbar } from 'vuetify/components';
import { useLayoutItem } from 'vuetify/lib/composables/layout.mjs';
import { useProxiedModel } from 'vuetify/lib/composables/proxiedModel.mjs';
import { useScroll } from 'vuetify/lib/composables/scroll.mjs';
import { useSsrBoot } from 'vuetify/lib/composables/ssrBoot.mjs';
import { useToggleScope } from 'vuetify/lib/composables/toggleScope.mjs';
import { omit } from 'vuetify/lib/util/helpers.mjs';
import { useRender } from 'vuetify/lib/util/useRender.mjs';
import { BeanBase, cast } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { ILayoutConfig } from '../types/layoutConfig.js';

@Sys()
export class SysAppBar extends BeanBase {
  public async initialize() {
    this._patchSetup();
  }

  private _patchSetup() {
    VAppBar.setup = function (props, { slots }) {
      const vToolbarRef = ref<VToolbar>();
      const isActive = useProxiedModel(props, 'modelValue');
      const scrollBehavior = computed(() => {
        const behavior = new Set(props.scrollBehavior?.split(' ') ?? []);
        return {
          hide: behavior.has('hide'),
          fullyHide: behavior.has('fully-hide'),
          inverted: behavior.has('inverted'),
          collapse: behavior.has('collapse'),
          elevate: behavior.has('elevate'),
          fadeImage: behavior.has('fade-image'),
        // shrink: behavior.has('shrink'),
        };
      });
      const canScroll = computed(() => {
        const behavior = scrollBehavior.value;
        return (
          behavior.hide ||
          behavior.fullyHide ||
          behavior.inverted ||
          behavior.collapse ||
          behavior.elevate ||
          behavior.fadeImage ||
          // behavior.shrink ||
          !isActive.value
        );
      });

      const appBarHeight = computed(() => {
        const height = vToolbarRef.value?.contentHeight ?? 0;
        const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0;
        return height + extensionHeight;
      });

      const {
        currentScroll,
        scrollThreshold,
        isScrollingUp,
        scrollRatio,
        isAtBottom,
        reachedBottomWhileScrollingDown,
        hasEnoughScrollableSpace,
      } = useScroll(props, { canScroll, layoutSize: appBarHeight });

      const canHide = toRef(() => (
        scrollBehavior.value.hide ||
        scrollBehavior.value.fullyHide
      ));
      const isCollapsed = computed(() => props.collapse || (
        scrollBehavior.value.collapse &&
        (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0)
      ));
      const isFlat = computed(() => props.flat || (
        scrollBehavior.value.fullyHide &&
        !isActive.value
      ) || (
        scrollBehavior.value.elevate &&
        (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0)
      ));
      const opacity = computed(() => (
        scrollBehavior.value.fadeImage
          ? (scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value)
          : undefined
      ));
      const height = computed(() => {
        if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;

        const height = vToolbarRef.value?.contentHeight ?? 0;
        const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0;

        if (!canHide.value) return (height + extensionHeight);

        return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide
          ? (height + extensionHeight)
          : height;
      });

      useToggleScope(() => !!props.scrollBehavior, () => {
        watchEffect(() => {
          if (!canHide.value) {
            isActive.value = true;
            return;
          }

          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
            return;
          }

          // If there's not enough scrollable space, don't apply scroll-hide behavior at all
          // This prevents flickering/bouncing animations on short pages
          if (!hasEnoughScrollableSpace.value) {
            isActive.value = true;
            return;
          }

          // Prevent navbar from showing when we reached bottom while scrolling down
          // This handles the case where scroll momentum causes to hit bottom during hide transition
          if (reachedBottomWhileScrollingDown.value) {
            isActive.value = false;
            return;
          }

          // Normal behavior: show when scrolling up (and not at bottom) or above threshold
          isActive.value = (isScrollingUp.value && !isAtBottom.value) || (currentScroll.value < scrollThreshold.value);
        });
      });

      const { ssrBootStyles } = useSsrBoot();
      const { layoutItemStyles } = useLayoutItem({
        id: props.name,
        order: computed(() => Number.parseInt(props.order as any, 10)),
        position: toRef(() => props.location),
        layoutSize: height,
        elementSize: shallowRef(undefined),
        active: isActive,
        absolute: toRef(() => props.absolute),
      });

      const layoutItemStylesPatch = useLayoutStylePatch(layoutItemStyles);

      useRender(() => {
        const toolbarProps = omit(VToolbar.filterProps(props), ['location']);

        return (
          <VToolbar
            ref={vToolbarRef}
            class={[
              'v-app-bar',
              {
                'v-app-bar--bottom': props.location === 'bottom',
              },
              props.class,
            ]}
            style={[
              {
                ...layoutItemStylesPatch.value,
                '--v-toolbar-image-opacity': opacity.value,
                'height': undefined,
                ...ssrBootStyles.value,
              },
              props.style,
            ]}
            {...toolbarProps}
            collapse={isCollapsed.value}
            flat={isFlat.value}
            v-slots={slots}
          />
        );
      });

      return {};
    };
  }
}

function useLayoutStylePatch(layoutItemStyles: Ref<CSSProperties, CSSProperties>) {
  const layoutConfigRef: Ref<ILayoutConfig> | undefined = inject('VuetifyLayoutConfig');
  return computed(() => {
    let layoutItemStylesPatch;
    if (process.env.SSR && layoutConfigRef?.value) {
      const __mainStyleLayoutLeft = `${layoutConfigRef.value.sidebar.width}px`;
      layoutItemStylesPatch = Object.assign(
        {},
        layoutItemStyles.value,
        {
          left: __mainStyleLayoutLeft,
          width: `calc(100% - ${__mainStyleLayoutLeft} - 0px)`,
        },
      );
    } else {
      layoutItemStylesPatch = layoutItemStyles.value;
    }
    return layoutItemStylesPatch;
  });
}
