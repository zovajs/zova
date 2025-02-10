import { BeanBase, Use } from 'zova';
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
  protected $options: T;
  protected $behaviorTag: IBehaviorTag;

  @Use({ injectionScope: 'host' })
  $$beanBehavior: BeanBehavior;

  protected async __init__(options: T, behaviorTag: IBehaviorTag) {
    this.$options = options;
    this.$behaviorTag = behaviorTag;
  }

  execute(_props: PROPS_INPUT, _next: NextBehavior<PROPS_OUTPUT>): VNode {
    throw new Error('Not Implemented');
  }
}
