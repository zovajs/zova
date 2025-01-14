import { Component, ComponentInternalInstance, createVNode } from 'vue';
import { JSX } from 'vue/jsx-runtime';
import { BeanControllerBase, cast } from 'zova';
import { ZTest3 } from 'zova-module-a-b';
import { Controller } from 'zova-module-a-bean';

export interface ControllerBehaviorSlots {
  default?: () => JSX.Element;
}

@Controller()
export class ControllerBehavior extends BeanControllerBase {
  protected async __init__() {}

  protected render() {
    return createInnerComp(ZTest3, this.ctx.instance);
  }
}

function createInnerComp(comp: Component, parent: ComponentInternalInstance) {
  const { ref, props, children } = parent.vnode;
  const vnode = createVNode(comp, props, children);
  // ensure inner component inherits the async wrapper's ref owner
  vnode.ref = ref;
  // pass the custom element callback on to the inner comp
  // and remove it from the async wrapper
  cast(vnode).ce = cast(parent.vnode).ce;
  delete cast(parent.vnode).ce;

  return vnode;
}
