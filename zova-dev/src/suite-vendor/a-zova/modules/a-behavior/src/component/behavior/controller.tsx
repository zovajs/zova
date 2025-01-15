import { createVNode } from 'vue';
import { BeanControllerBase, cast, IComponentOptions, SymbolControllerRefDisable, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IBehaviors, IBehaviorTag } from '../../types/behavior.js';
import { BeanBehavior } from '../../bean/bean.behavior.js';
import { Composer } from '../../lib/composer.js';

export interface ControllerBehaviorProps {
  behaviorTag: IBehaviorTag;
  behaviors: IBehaviors;
}

@Controller()
export class ControllerBehavior extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };
  protected [SymbolControllerRefDisable]: boolean = true;

  @Use()
  $$beanBehavior: BeanBehavior;
  composer: Composer;

  protected async __init__() {
    await this._loadBehaviors();
    // todo: watch
  }

  protected render() {
    return this._createInnerComp();
  }

  private async _loadBehaviors() {
    this.composer = await this.$$beanBehavior.createComposer(this.$props.behaviors, this.$props.behaviorTag);
  }

  private _createInnerComp() {
    const parent = this.ctx.instance;
    const { ref, props, children } = parent.vnode;
    // props
    const propsNew = this.composer.props(() => {
      const propsNew = Object.assign({}, props);
      delete propsNew['behaviorTag'];
      delete propsNew['behaviors'];
      return propsNew;
    });
    // render
    const vnode = this.composer.render(propsNew, () => {
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
