import { BeanRenderBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { StyleRouterViewTabs } from './style.js';
import { ComponentInternalInstance, KeepAlive, Transition } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';

export interface RenderRouterViewTabs extends StyleRouterViewTabs {}

export interface RouterViewSlotParams {
  Component: ComponentInternalInstance;
  route: RouteLocationNormalizedLoaded;
}

@Local()
export class RenderRouterViewTabs extends BeanRenderBase {
  render() {
    const slots = {
      default: component => {
        const { componentKey } = this._handleComponent(component);
        return (
          <Transition>
            <KeepAlive include={this.$$modelTabs.keepAliveInclude}>
              <component.Component key={componentKey}></component.Component>
            </KeepAlive>
          </Transition>
        );
      },
    };
    return <RouterView v-slots={slots}></RouterView>;
  }
}
