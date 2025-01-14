import { createVNode } from 'vue';
import { BeanControllerBase, cast, SymbolControllerRefDisable, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IBehaviorComposeData, IBehaviorItem, IBehaviorTag } from '../../types/behavior.js';
import { BeanBehavior } from '../../bean/bean.behavior.js';

export interface ControllerBehaviorProps {
  behaviorTag: IBehaviorTag;
  behaviors: IBehaviorItem | IBehaviorItem[];
}

@Controller()
export class ControllerBehavior extends BeanControllerBase {
  static $propsDefault = {};
  protected [SymbolControllerRefDisable]: boolean = true;

  @Use()
  $$beanBehavior: BeanBehavior;
  composer: (context: IBehaviorComposeData, next?: any) => any;

  protected async __init__() {
    await this._loadBehaviors();
    // todo: watch
  }

  protected render() {
    return this._createInnerComp();
  }

  private async _loadBehaviors() {
    this.composer = await this.$$beanBehavior.loadAndComposeBehaviors(this.$props.behaviors);
  }

  private _createInnerComp() {
    const parent = this.ctx.instance;
    const { ref, props, children } = parent.vnode;
    // props
    const propsNew = this.composer({ behaviorTag: this.$props.behaviorTag, method: 'props' }, () => {
      const propsNew = Object.assign({}, props);
      delete propsNew['behaviorTag'];
      delete propsNew['behaviors'];
      return propsNew;
    });
    // render
    const vnode = this.composer({ behaviorTag: this.$props.behaviorTag, method: 'render' }, () => {
      return createVNode(this.$props.behaviorTag.component, propsNew, children);
    });
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
