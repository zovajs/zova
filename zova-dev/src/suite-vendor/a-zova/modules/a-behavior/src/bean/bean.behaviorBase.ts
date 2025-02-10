import { BeanBase, Use } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { type IBehaviorTag, IDecoratorBehaviorOptions, NextBehavior } from '../types/behavior.js';
import { VNode } from 'vue';
import { BeanBehavior } from './bean.behavior.js';

@Virtual()
export class BeanBehaviorBase<
  OPTIONS extends IDecoratorBehaviorOptions = IDecoratorBehaviorOptions,
  PROPS_INPUT = unknown,
  PROPS_OUTPUT = PROPS_INPUT,
> extends BeanBase {
  protected $options: OPTIONS;

  @Use({ injectionScope: 'host' })
  $$beanBehavior: BeanBehavior;

  @Use({ injectionScope: 'host' })
  $$behaviorTag: IBehaviorTag;

  protected async __init__(options: OPTIONS) {
    this.$options = options;
  }

  protected async onOptionsChange(options: OPTIONS) {
    this.$options = options;
  }

  protected render(_props: PROPS_INPUT, _next: NextBehavior<PROPS_OUTPUT>): VNode {
    throw new Error('Not Implemented');
  }
}
