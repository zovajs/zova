import { BeanBase, Use } from 'zova';
import { Bean, BeanOnion } from 'zova-module-a-bean';
import { IBehaviorItem } from '../types/behavior.js';

@Bean()
export class BeanBehavior extends BeanBase {
  @Use()
  $$beanOnion: BeanOnion;

  protected async __init__() {}

  public async loadAndComposeBehaviors(behaviors: IBehaviorItem | IBehaviorItem[]) {
    if (!Array.isArray(behaviors)) behaviors = [behaviors];
    const onions = await this.$$beanOnion.behavior.loadOnions(behaviors);
    console.log(onions);
  }
}
