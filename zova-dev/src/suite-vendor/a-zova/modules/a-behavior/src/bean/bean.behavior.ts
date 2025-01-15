import { BeanBase, cast, Use } from 'zova';
import { Bean, BeanOnion, IOnionItem } from 'zova-module-a-bean';
import { IBehaviorComposeData, IBehaviorItem, IBehaviorRecord, IDecoratorBehaviorOptions } from '../types/behavior.js';

@Bean()
export class BeanBehavior extends BeanBase {
  @Use()
  $$beanOnion: BeanOnion;

  protected async __init__() {}

  public async loadAndComposeBehaviors(behaviors: IBehaviorItem | IBehaviorItem[]) {
    if (!Array.isArray(behaviors)) behaviors = [behaviors];
    // onionItems
    const onionItems: IOnionItem<IDecoratorBehaviorOptions, keyof IBehaviorRecord>[] = [];
    for (const behaviorItem of behaviors) {
      for (const key in behaviorItem) {
        onionItems.push({ name: key as unknown as keyof IBehaviorRecord, options: behaviorItem[key] });
      }
    }
    // load onions
    const onions = await this.$$beanOnion.behavior.loadOnions(onionItems);
    // create behaviors
    for (const onion of onions) {
      onion.beanInstance = await this.bean._newBean(onion.beanFullName as any, true);
    }
    // compose
    return this.$$beanOnion.behavior.compose(onions, (onionSlice, data: IBehaviorComposeData, options, next) => {
      if (!cast(onionSlice.beanInstance)[data.method]) return next();
      if (data.method === 'props') {
        return cast(onionSlice.beanInstance)[data.method](options, data.behaviorTag, next);
      } else {
        return cast(onionSlice.beanInstance)[data.method](data.props, options, data.behaviorTag, next);
      }
    });
  }
}
