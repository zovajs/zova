import { BeanControllerBase, cast, Use } from 'zova';
import { Local } from 'zova-module-a-bean';
import { RouterViewSlotParams } from './render.jsx';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { nextTick } from 'vue';
import { ModelTabs } from '../../model/tabs.js';

export interface ControllerRouterViewTabsSlots {}

export interface ControllerRouterViewTabsProps {}

export type ControllerRouterViewTabsEmits = {};

@Local()
export class ControllerRouterViewTabs extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'skipSelf' })
  $$modelTabs: ModelTabs;

  _handleComponentName(component: RouterViewSlotParams) {
    let name = component.Component.type.name;
    if (name) return name;
    name = component.route.meta.name || this.$router.getRealRouteName(component.route.name) || component.route.path;
    cast(component.Component.type).name = name;
    return name;
  }

  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'componentKey' | 'tabKey'): string;
  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'keepAlive'): boolean;
  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop) {
    let value = route.meta[prop];
    if (typeof value === 'function') {
      value = value(route);
    }
    return value;
  }

  _handleComponent(component: RouterViewSlotParams) {
    // fullPath
    const fullPath = component.route.fullPath;
    // name
    const name = this._handleComponentName(component);
    // componentKey
    const componentKey = this._handleRouteProp(component.route, 'componentKey') || name;
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
}
