import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { IBehaviorTag, IDecoratorBehaviorOptions, NextBehavior } from '../types/behavior.js';
import { VNode } from 'vue';
import { BeanBehavior } from './bean.behavior.js';

@Virtual()
export class BeanBehaviorBase<
  T extends IDecoratorBehaviorOptions = IDecoratorBehaviorOptions,
  PROPS_INPUT = unknown,
  PROPS_OUTPUT = PROPS_INPUT,
> extends BeanBase {
  protected $beanBehavior: BeanBehavior;
  protected $options: T;
  protected $behaviorTag: IBehaviorTag;

  protected async __init__(beanBehavior: BeanBehavior, options: T, behaviorTag: IBehaviorTag) {
    this.$beanBehavior = beanBehavior;
    this.$options = options;
    this.$behaviorTag = behaviorTag;
  }

  execute(_props: PROPS_INPUT, _next: NextBehavior<PROPS_OUTPUT>): VNode {
    throw new Error('Not Implemented');
  }
}
