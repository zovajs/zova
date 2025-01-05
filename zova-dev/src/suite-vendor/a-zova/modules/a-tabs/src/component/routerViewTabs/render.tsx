import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleRouterViewTabs } from './style.js';
import { ComponentInternalInstance, KeepAlive, Transition } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';

export interface RouterViewSlotParams {
  Component: ComponentInternalInstance;
  route: RouteLocationNormalizedLoaded;
}

@Render()
export class RenderRouterViewTabs extends BeanRenderBase {
  public render() {
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
