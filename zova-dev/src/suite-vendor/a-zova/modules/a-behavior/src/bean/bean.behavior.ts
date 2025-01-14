import { BeanBase, cast, Use } from 'zova';
import { Bean, BeanOnion } from 'zova-module-a-bean';
import { IBehaviorComposeData, IBehaviorItem } from '../types/behavior.js';

@Bean()
export class BeanBehavior extends BeanBase {
  @Use()
  $$beanOnion: BeanOnion;

  protected async __init__() {}

  public async loadAndComposeBehaviors(behaviors: IBehaviorItem | IBehaviorItem[]) {
    if (!Array.isArray(behaviors)) behaviors = [behaviors];
    // load onions
    const onions = await this.$$beanOnion.behavior.loadOnions(behaviors);
    // create behaviors
    for (const onion of onions) {
      onion.beanInstance = await this.bean._newBean(onion.beanFullName as any, true);
    }
    // compose
    return this.$$beanOnion.behavior.compose(onions, (onionSlice, data: IBehaviorComposeData, options, next) => {
      if (!cast(onionSlice.beanInstance)[data.method]) return next();
      return cast(onionSlice.beanInstance)[data.method](options, data.behaviorTag, next);
    });
  }
}
