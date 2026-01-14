import type { RouteLocationNormalizedLoaded } from '@cabloy/vue-router';
import type { IRouterViewSlotParams, IRouteViewComponentMeta } from '../types/routerView.js';
import { nextTick } from 'vue';
import { BeanControllerBase, cast } from 'zova';
import { routerViewKey } from './const.js';

export interface IRouterViewPropsBase {
  onRender?(componentMeta: IRouteViewComponentMeta, component: IRouterViewSlotParams): void;
  onRendered?(componentMeta: IRouteViewComponentMeta, component: IRouterViewSlotParams): void;
  onKeepAliveInclude?(): string[] | undefined;
}

export class BeanRouterViewBase extends BeanControllerBase {
  protected async __init__() {
    this.bean._setBean(routerViewKey, this);
    this.$router.addRouterView(this);
  }

  protected __dispose__() {
    this.$router.removeRouterView(this);
  }

  private _handleComponentName(component: IRouterViewSlotParams) {
    let name = component.Component.type.name;
    if (name) return name;
    name = component.route.meta.name || this.$router.getRealRouteName(component.route.name) || component.route.path;
    // must set Component.type.name, because keep-alive need Component.type.name
    //   so: one Component must be used for only one route
    // todo: 不必写入组件中，而且必须总是动态获取组件名称
    cast(component.Component.type).name = name;
    return name;
  }

  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'componentKey' | 'tabKey'): string;
  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'keepAlive'): boolean;
  private _handleRouteProp(route: RouteLocationNormalizedLoaded, prop) {
    let value = route.meta[prop];
    if (typeof value === 'function') {
      value = value.call(this.app, route);
    }
    return value;
  }

  private __handleRoutePropComponentKey(route: RouteLocationNormalizedLoaded, name: string) {
    const componentKey = this._handleRouteProp(route, 'componentKey');
    if (componentKey) return componentKey;
    // path
    if (!route.name) return name;
    // name: nameOnly
    if (route.meta.componentKeyMode === 'nameOnly') return name;
    // name: withParams
    return route.path;
  }

  protected prepareComponentMeta(component: IRouterViewSlotParams): IRouteViewComponentMeta {
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
    const componentMeta: IRouteViewComponentMeta = { key: tabKey, componentKey, fullPath, name, keepAlive };
    // onRender
    cast(this.$props).onRender?.(componentMeta, component);
    // add tab
    nextTick(() => {
      cast(this.$props).onRendered?.(componentMeta, component);
    });
    return componentMeta;
  }

  protected getKeepAliveInclude() {
    return cast(this.$props).onKeepAliveInclude?.();
  }
}
