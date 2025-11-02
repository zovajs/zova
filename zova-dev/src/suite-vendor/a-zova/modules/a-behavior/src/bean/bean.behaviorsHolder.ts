import type { IBehaviors, IBehaviorTag } from '../types/behavior.js';
import { createVNode } from 'vue';
import { BeanBase, cast, deepEqual, disposeInstance, Use } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { Log } from 'zova-module-a-logger';
import { $UseBehavior } from '../lib/useBehavior.js';
import { ServiceComposer } from '../service/composer.js';
import { BeanBehavior } from './bean.behavior.js';

export interface IBehaviorsHolderOptions {
  behaviors: IBehaviors | (() => IBehaviors);
  behaviorTag: IBehaviorTag;
}

@Bean()
export class BeanBehaviorsHolder extends BeanBase {
  private options: IBehaviorsHolderOptions;
  private composer: ServiceComposer;

  @Use()
  $$beanBehavior: BeanBehavior;

  async init(options: IBehaviorsHolderOptions) {
    this.options = options;
    const behaviors = this.options.behaviors;
    if (typeof behaviors === 'function') {
      this.$watch(
        behaviors,
        async (newValue, oldValue) => {
          if (deepEqual(newValue, oldValue)) return;
          await this.composer.load(this._getBehaviorRoot(newValue));
        },
      );
    }
    this.bean._setBean('$$behaviorTag', this.options.behaviorTag);
    this.composer = await this.$$beanBehavior.createComposer(this._getBehaviorRoot());
  }

  protected __dispose__() {
    disposeInstance(this.composer);
  }

  private _getBehaviors() {
    let behaviors = this.options.behaviors;
    if (typeof behaviors === 'function') {
      behaviors = behaviors();
    }
    return behaviors;
  }

  @Log({ args: false, childName: 'behavior', level: 'debug' })
  private _getBehaviorRoot(behaviors?: IBehaviors) {
    if (!behaviors) {
      behaviors = this._getBehaviors();
    }
    return $UseBehavior('a-behavior:root' as never, { behaviors } as any);
  }

  public render(vNodeDefault?: Function) {
    const parent = this.ctx.instance;
    const { ref, props, children } = parent.vnode;
    // props
    const propsNew = Object.assign({}, props);
    delete propsNew.behaviorTag;
    delete propsNew.behaviors;
    // render
    const vnode = this.composer.render(propsNew, propsNew => {
      if (vNodeDefault) return vNodeDefault();
      return createVNode(this.options.behaviorTag.component, propsNew, children);
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
