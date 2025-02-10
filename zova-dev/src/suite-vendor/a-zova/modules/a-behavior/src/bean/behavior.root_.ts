import { VNode } from 'vue';
import { IBehaviors, IDecoratorBehaviorOptions, NextBehavior } from '../types/behavior.js';
import { Behavior } from '../lib/behavior.js';
import { BeanBehaviorBase } from './bean.behaviorBase.js';
import { Composer } from '../lib/composer.js';

export interface IBehaviorPropsInputRoot {}

export interface IBehaviorPropsOutputRoot {}

export interface IBehaviorOptionsRoot extends IDecoratorBehaviorOptions {
  behaviors: IBehaviors;
}

@Behavior<IBehaviorOptionsRoot>()
export class BehaviorRoot extends BeanBehaviorBase<
  IBehaviorOptionsRoot,
  IBehaviorPropsInputRoot,
  IBehaviorPropsOutputRoot
> {
  private composer: Composer;

  protected async __init__(options: IBehaviorOptionsRoot) {
    super.__init__(options);
    this.composer = await this.$$beanBehavior.createComposer(options.behaviors);
  }

  protected __dispose__() {
    this.composer?.dispose();
  }

  protected async onOptionsChange(options: IBehaviorOptionsRoot) {
    await super.onOptionsChange(options);
    await this.composer.load(options.behaviors);
  }

  protected render(props: IBehaviorPropsInputRoot, next: NextBehavior<IBehaviorPropsOutputRoot>): VNode {
    return this.composer.render(props, next);
  }
}
