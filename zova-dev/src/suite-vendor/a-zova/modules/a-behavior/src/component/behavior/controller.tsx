import type {
  IComponentOptions,
} from 'zova';
import type { ServiceComposer } from '../../service/composer.js';
import type { IBehaviors, IBehaviorTag } from '../../types/behavior.js';
import { createVNode } from 'vue';
import {
  BeanControllerBase,
  cast,
  deepEqual,
  disposeInstance,
  SymbolControllerRefDisable,
  Use,
  Watch,
} from 'zova';
import { Controller } from 'zova-module-a-bean';
import { Log } from 'zova-module-a-logger';
import { BeanBehavior } from '../../bean/bean.behavior.js';
import { UseBehavior } from '../../lib/useBehavior.js';

export interface ControllerBehaviorProps {
  behaviorTag: IBehaviorTag;
  behaviors: IBehaviors;
}

@Controller()
export class ControllerBehavior extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };
  protected [SymbolControllerRefDisable]: boolean = true;
  private composer: ServiceComposer;

  @Use()
  $$beanBehavior: BeanBehavior;

  @Watch('$props.behaviors')
  async watchBehaviors(newValue, oldValue) {
    if (deepEqual(newValue, oldValue)) return;
    await this.composer.load(this._getBehaviorRoot());
  }

  protected async __init__() {
    this.bean._setBean('$$behaviorTag', this.$props.behaviorTag);
    this.composer = await this.$$beanBehavior.createComposer(this._getBehaviorRoot());
  }

  protected __dispose__() {
    disposeInstance(this.composer);
  }

  @Log({ args: false, childName: 'behavior' }) // level: 'debug'
  private _getBehaviorRoot() {
    return UseBehavior('a-behavior:root' as any, { behaviors: this.$props.behaviors });
  }

  protected render() {
    return this._renderInner();
  }

  private _renderInner() {
    const parent = this.ctx.instance;
    const { ref, props, children } = parent.vnode;
    // props
    const propsNew = Object.assign({}, props);
    delete propsNew.behaviorTag;
    delete propsNew.behaviors;
    // render
    const vnode = this.composer.render(propsNew, propsNew => {
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
