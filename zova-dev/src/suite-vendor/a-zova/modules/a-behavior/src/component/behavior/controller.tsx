import { createVNode } from 'vue';
import { BeanControllerBase, cast, SymbolControllerRefDisable } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IBehaviorItem, IBehaviorTag } from '../../types/behavior.js';

export interface ControllerBehaviorProps {
  behaviorTag: IBehaviorTag;
  behaviors: IBehaviorItem | IBehaviorItem[];
}

@Controller()
export class ControllerBehavior extends BeanControllerBase {
  static $propsDefault = {};
  protected [SymbolControllerRefDisable]: boolean = true;

  protected async __init__() {}

  protected render() {
    return this._createInnerComp();
  }

  private _createInnerComp() {
    const parent = this.ctx.instance;
    const { ref, props, children } = parent.vnode;
    const propsNew = Object.assign({}, props, { behaviorTag: undefined, behaviors: undefined });
    const vnode = createVNode(this.$props.behaviorTag.component, propsNew, children);
    // ensure inner component inherits the async wrapper's ref owner
    vnode.ref = ref;
    // pass the custom element callback on to the inner comp
    // and remove it from the async wrapper
    cast(vnode).ce = cast(parent.vnode).ce;
    delete cast(parent.vnode).ce;
    // ok
    return vnode;
  }
}
