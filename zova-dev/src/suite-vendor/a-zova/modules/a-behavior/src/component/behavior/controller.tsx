import { createVNode } from 'vue';
import { JSX } from 'vue/jsx-runtime';
import { BeanControllerBase } from 'zova';
import { ZTest3 } from 'zova-module-a-b';
import { Controller } from 'zova-module-a-bean';

export interface ControllerBehaviorSlots {
  default?: () => JSX.Element;
}

@Controller()
export class ControllerBehavior extends BeanControllerBase {
  protected async __init__() {}

  protected render() {
    return createVNode(ZTest3, this.$attrs, [this.$slots.default?.()]);
    // return (
    //   <div>
    //     <ZTest3 {...this.$attrs}></ZTest3>
    //     {this.$slots.default?.()}
    //   </div>
    // );
    // const vnode = this.$slots.default?.();
    // if (!vnode) return;
    // return vnode;
  }
  // protected render() {
  //   const vnode = this.$slots.default?.();
  //   if (!vnode) return;
  //   return withDirectives(vnode[0], [[vModelText, 3]]);
  // }
}
