import type { RouteLocationNormalizedLoaded } from '@cabloy/vue-router';
import type { ComponentInternalInstance } from 'vue';
import { RouterView } from '@cabloy/vue-router';
import { h, KeepAlive, nextTick, Transition } from 'vue';
import { BeanControllerBase, cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { pageRouteKey } from 'zova-module-a-router';
import { ModelTabs } from '../../model/tabs.js';

export interface ControllerRouterViewTabsProps {}

export interface RouterViewSlotParams {
  Component: ComponentInternalInstance;
  route: RouteLocationNormalizedLoaded;
}

@Controller()
export class ControllerRouterViewTabs extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'skipSelf' })
  $$modelTabs: ModelTabs;

  _handleComponentName(component: RouterViewSlotParams) {
    let name = component.Component.type.name;
    if (name) return name;
    name = component.route.meta.name || this.$router.getRealRouteName(component.route.name) || component.route.path;
    // must set Component.type.name, because keep-alive need Component.type.name
    //   so: one Component must be used for only one route
    cast(component.Component.type).name = name;
    return name;
  }

  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'componentKey' | 'tabKey'): string;
  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'keepAlive'): boolean;
  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop) {
    let value = route.meta[prop];
    if (typeof value === 'function') {
      value = value.call(this.app, route);
    }
    return value;
  }

  __handleRoutePropComponentKey(route: RouteLocationNormalizedLoaded, name: string) {
    const componentKey = this._handleRouteProp(route, 'componentKey');
    if (componentKey) return componentKey;
    // path
    if (!route.name) return name;
    // name: nameOnly
    if (route.meta.componentKeyMode === 'nameOnly') return name;
    // name: withParams
    return route.path;
  }

  _handleComponent(component: RouterViewSlotParams) {
    // fullPath
    const fullPath = component.route.fullPath;
    // name
    const name = this._handleComponentName(component);
    // componentKey
    const componentKey = this.__handleRoutePropComponentKey(component.route, name);
    // tabKey
    const tabKey = this._handleRouteProp(component.route, 'tabKey') || componentKey;
    // keepAlive
    const keepAlive = this._handleRouteProp(component.route, 'keepAlive');
    // tab
    const tab = { key: tabKey, fullPath, name, keepAlive };
    // add tab
    nextTick(() => {
      this.$$modelTabs.addTab(tab);
    });
    return { componentKey };
  }

  protected render() {
    const slots = {
      default: component => {
        const { componentKey } = this._handleComponent(component);
        return h(Transition, null, {
          default: () => {
            const vnode = h(component.Component, {
              key: componentKey,
            });
            cast(vnode).zovaHostProviders = { [pageRouteKey]: component.route };
            return [
              h(KeepAlive, {
                include: this.$$modelTabs.keepAliveInclude,
              }, [vnode]),
            ];
          },
        });
      },
    };
    return <RouterView v-slots={slots}></RouterView>;
  }
}
