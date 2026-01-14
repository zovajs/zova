import type { RouteLocationNormalizedLoaded } from '@cabloy/vue-router';
import type { IRouterViewSlotParams, IRouteViewComponentMeta } from '../types/routerView.js';
import { nextTick } from 'vue';
import { BeanControllerBase } from 'zova';
import { routerViewKey } from './const.js';

export interface IRouterViewPropsBase {}

export class BeanRouterViewBase extends BeanControllerBase implements IRouterViewPropsBase {
  protected async __init__() {
    this.bean._setBean(routerViewKey, this);
    this.$router.addRouterView(this);
  }

  protected __dispose__() {
    this.$router.removeRouterView(this);
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

  private __handleRoutePropComponentKey(route: RouteLocationNormalizedLoaded) {
    const componentKey = this._handleRouteProp(route, 'componentKey');
    if (componentKey) return componentKey;
    // name
    const name = this.$router.getRealRouteName(route.name);
    // path
    if (!name) return route.path;
    // name: nameOnly
    if (route.meta.componentKeyMode === 'nameOnly') return name;
    // name: withParams
    return route.path;
  }

  protected prepareComponentMeta(component: IRouterViewSlotParams): IRouteViewComponentMeta {
    // fullPath
    const fullPath = component.route.fullPath;
    // componentKey
    const componentKey = this.__handleRoutePropComponentKey(component.route);
    // tabKey
    const tabKey = this._handleRouteProp(component.route, 'tabKey') || componentKey;
    // keepAlive
    const keepAlive = this._handleRouteProp(component.route, 'keepAlive');
    // tab
    const componentMeta: IRouteViewComponentMeta = { tabKey, componentKey, fullPath, name, keepAlive };
    // onRender
    this.onRender(componentMeta, component);
    // add tab
    nextTick(() => {
      this.onRendered(componentMeta, component);
    });
    return componentMeta;
  }

  protected getKeepAliveInclude() {
    return this.onKeepAliveInclude();
  }

  protected onRender(_componentMeta: IRouteViewComponentMeta, _component: IRouterViewSlotParams): void {}

  protected onRendered(_componentMeta: IRouteViewComponentMeta, _component: IRouterViewSlotParams): void {}

  protected onKeepAliveInclude(): string[] | undefined {
    throw new Error('Not Implemented');
  }
}
