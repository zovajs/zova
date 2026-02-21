import { useRouter } from '@cabloy/vue-router';
import { computed, CSSProperties, inject, nextTick, readonly, Ref, ref, shallowRef, toRef, Transition, watch } from 'vue';
import { useDisplay, useRtl } from 'vuetify';
import { VDefaultsProvider, VImg } from 'vuetify/components';
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer';
import { useSticky } from 'vuetify/lib/components/VNavigationDrawer/sticky.mjs';
import { useTouch } from 'vuetify/lib/components/VNavigationDrawer/touch.mjs';
import { useBorder } from 'vuetify/lib/composables/border.mjs';
import { useBackgroundColor } from 'vuetify/lib/composables/color.mjs';
import { provideDefaults } from 'vuetify/lib/composables/defaults.mjs';
import { useDelay } from 'vuetify/lib/composables/delay.mjs';
import { useElevation } from 'vuetify/lib/composables/elevation.mjs';
import { useFocusTrap } from 'vuetify/lib/composables/focusTrap.mjs';
import { useLayoutItem } from 'vuetify/lib/composables/layout.mjs';
import { useProxiedModel } from 'vuetify/lib/composables/proxiedModel.mjs';
import { useRounded } from 'vuetify/lib/composables/rounded.mjs';
import { useScopeId } from 'vuetify/lib/composables/scopeId.mjs';
import { useSsrBoot } from 'vuetify/lib/composables/ssrBoot.mjs';
import { provideTheme } from 'vuetify/lib/composables/theme.mjs';
import { useToggleScope } from 'vuetify/lib/composables/toggleScope.mjs';
import { toPhysical } from 'vuetify/lib/util/anchor.mjs';
import { useRender } from 'vuetify/lib/util/useRender.mjs';
import { BeanBase } from 'zova';
import { Sys } from 'zova-module-a-bean';
import { ILayoutConfig } from '../types/layoutConfig.js';

@Sys()
export class SysNavigationDrawer extends BeanBase {
  public async initialize() {
    this._patchSetup();
  }

  private _patchSetup() {
    VNavigationDrawer.setup = function (props, { attrs, emit, slots }) {
      const { isRtl } = useRtl();
      const { themeClasses } = provideTheme(props);
      const { borderClasses } = useBorder(props);
      const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color);
      const { elevationClasses } = useElevation(props);
      const { displayClasses, mobile } = useDisplay(props);
      const { roundedClasses } = useRounded(props);
      const router = useRouter();
      const isActive = useProxiedModel(props, 'modelValue', null, v => !!v);
      const { ssrBootStyles } = useSsrBoot();
      const { scopeId } = useScopeId();

      const rootEl = ref<HTMLElement>();
      const isHovering = shallowRef(false);

      const { runOpenDelay, runCloseDelay } = useDelay(props, value => {
        isHovering.value = value;
      });

      const width = computed(() => {
        return (props.rail && props.expandOnHover && isHovering.value)
          ? Number(props.width)
          : Number(props.rail ? props.railWidth : props.width);
      });
      const location = computed(() => {
        return toPhysical(props.location, isRtl.value) as 'left' | 'right' | 'bottom';
      });
      const isPersistent = toRef(() => props.persistent);
      const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
      const isSticky = computed(() =>
        props.sticky &&
        !isTemporary.value &&
        location.value !== 'bottom',
      );

      useFocusTrap(props, { isActive, localTop: isTemporary, contentEl: rootEl });

      useToggleScope(() => props.expandOnHover && props.rail != null, () => {
        watch(isHovering, val => emit('update:rail', !val));
      });

      useToggleScope(() => !props.disableResizeWatcher, () => {
        watch(isTemporary, val => !props.permanent && (nextTick(() => isActive.value = !val)));
      });

      useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
        watch(router!.currentRoute, () => isTemporary.value && (isActive.value = false));
      });

      watch(() => props.permanent, val => {
        if (val) isActive.value = true;
      });

      if (props.modelValue == null && !isTemporary.value) {
        isActive.value = props.permanent || !mobile.value;
      }

      const { isDragging, dragProgress } = useTouch({
        el: rootEl,
        isActive,
        isTemporary,
        width,
        touchless: toRef(() => props.touchless),
        position: location,
      });

      const layoutSize = computed(() => {
        const size = isTemporary.value
          ? 0
          : props.rail && props.expandOnHover
            ? Number(props.railWidth)
            : width.value;

        return isDragging.value ? size * dragProgress.value : size;
      });
      const { layoutItemStyles, layoutItemScrimStyles } = useLayoutItem({
        id: props.name,
        order: computed(() => Number.parseInt(props.order as any, 10)),
        position: location,
        layoutSize,
        elementSize: width,
        active: readonly(isActive),
        disableTransitions: toRef(() => isDragging.value),
        absolute: computed(() =>
        // eslint-disable-next-line
          props.absolute || (isSticky.value && typeof isStuck.value !== 'string'),
        ),
      });

      const { isStuck, stickyStyles } = useSticky({ rootEl, isSticky, layoutItemStyles });

      const scrimColor = useBackgroundColor(() => {
        return typeof props.scrim === 'string' ? props.scrim : null;
      });
      const scrimStyles = computed(() => ({
        ...isDragging.value
          ? {
              opacity: dragProgress.value * 0.2,
              transition: 'none',
            }
          : undefined,
        ...layoutItemScrimStyles.value,
      }));

      provideDefaults({
        VList: {
          bgColor: 'transparent',
        },
      });

      const layoutItemStylesPatch = useLayoutStylePatch(layoutItemStyles);

      useRender(() => {
        const hasImage = (slots.image || props.image);

        return (
          <>
            <props.tag
              ref={rootEl}
              onMouseenter={runOpenDelay}
              onMouseleave={runCloseDelay}
              class={[
                'v-navigation-drawer',
                `v-navigation-drawer--${location.value}`,
                {
                  'v-navigation-drawer--expand-on-hover': props.expandOnHover,
                  'v-navigation-drawer--floating': props.floating,
                  'v-navigation-drawer--is-hovering': isHovering.value,
                  'v-navigation-drawer--rail': props.rail,
                  'v-navigation-drawer--temporary': isTemporary.value,
                  'v-navigation-drawer--persistent': isPersistent.value,
                  'v-navigation-drawer--active': isActive.value,
                  'v-navigation-drawer--sticky': isSticky.value,
                },
                themeClasses.value,
                backgroundColorClasses.value,
                borderClasses.value,
                displayClasses.value,
                elevationClasses.value,
                roundedClasses.value,
                props.class,
              ]}
              style={[
                backgroundColorStyles.value,
                layoutItemStylesPatch.value,
                ssrBootStyles.value,
                stickyStyles.value,
                props.style,
              ]}
              inert={!isActive.value}
              {...scopeId}
              {...attrs}
            >
              { hasImage && (
                <div key="image" class="v-navigation-drawer__img">
                  { !slots.image
                    ? (
                        <VImg
                          key="image-img"
                          alt=""
                          cover
                          height="inherit"
                          src={props.image}
                        />
                      )
                    : (
                        <VDefaultsProvider
                          key="image-defaults"
                          disabled={!props.image}
                          defaults={{
                            VImg: {
                              alt: '',
                              cover: true,
                              height: 'inherit',
                              src: props.image,
                            },
                          }}
                          v-slots:default={slots.image}
                        />
                      )}
                </div>
              )}

              { slots.prepend && (
                <div class="v-navigation-drawer__prepend">
                  { slots.prepend?.() }
                </div>
              )}

              <div class="v-navigation-drawer__content">
                { slots.default?.() }
              </div>

              { slots.append && (
                <div class="v-navigation-drawer__append">
                  { slots.append?.() }
                </div>
              )}
            </props.tag>

            <Transition name="fade-transition">
              { isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && (
                <div
                  class={['v-navigation-drawer__scrim', scrimColor.backgroundColorClasses.value]}
                  style={[scrimStyles.value, scrimColor.backgroundColorStyles.value]}
                  onClick={() => {
                    if (isPersistent.value) return;
                    isActive.value = false;
                  }}
                  {...scopeId}
                />
              )}
            </Transition>
          </>
        );
      });

      return {
        isStuck,
      };
    };
  }
}

function useLayoutStylePatch(layoutItemStyles: Ref<CSSProperties, CSSProperties>) {
  const layoutConfigRef: Ref<ILayoutConfig> | undefined = inject('VuetifyLayoutConfig', undefined);
  return computed(() => {
    let layoutItemStylesPatch;
    if (process.env.SSR && layoutConfigRef?.value) {
      if (layoutConfigRef.value.leftDrawerOpen) {
        layoutItemStylesPatch = Object.assign(
          {},
          layoutItemStyles.value,
          {
            width: `${layoutConfigRef.value.sidebar.width}px`,
            transform: 'translateX(0px)',
          },
        );
      } else {
        layoutItemStylesPatch = layoutItemStyles.value;
      }
    } else {
      layoutItemStylesPatch = layoutItemStyles.value;
    }
    return layoutItemStylesPatch;
  });
}
