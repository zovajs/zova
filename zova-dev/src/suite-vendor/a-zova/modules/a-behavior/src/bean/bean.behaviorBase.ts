import { BeanBase, Use } from 'zova';
import { Virtual } from 'zova-module-a-bean';
import { IBehaviors, type IBehaviorTag, IDecoratorBehaviorOptions, NextBehavior } from '../types/behavior.js';
import { VNode } from 'vue';
import { BeanBehavior } from './bean.behavior.js';
import { ServiceComposer } from '../service/composer.js';

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

  protected async createComposer(behaviors: IBehaviors): Promise<ServiceComposer> {
    return await this.$$beanBehavior.createComposer(behaviors);
  }

  protected render(_props: PROPS_INPUT, next: NextBehavior<PROPS_OUTPUT>): VNode {
    return next();
  }
}
