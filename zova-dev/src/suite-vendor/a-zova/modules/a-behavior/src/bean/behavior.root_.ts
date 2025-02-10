import { VNode } from 'vue';
import { IDecoratorBehaviorOptions, NextBehavior } from '../types/behavior.js';
import { Behavior } from '../lib/behavior.js';
import { BeanBehaviorBase } from './bean.behaviorBase.js';

export interface IBehaviorPropsInputRoot {}

export interface IBehaviorPropsOutputRoot {}

export interface IBehaviorOptionsRoot extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsRoot>()
export class BehaviorRoot extends BeanBehaviorBase<
  IBehaviorOptionsRoot,
  IBehaviorPropsInputRoot,
  IBehaviorPropsOutputRoot
> {
  render(_props: IBehaviorPropsInputRoot, next: NextBehavior<IBehaviorPropsOutputRoot>): VNode {
    return next();
  }
}
