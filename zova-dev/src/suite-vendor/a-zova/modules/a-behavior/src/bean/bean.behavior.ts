import { BeanBase, cast, Use } from 'zova';
import { Bean, BeanOnion, IOnionItem } from 'zova-module-a-bean';
import {
  IBehaviorComposeData,
  IBehaviorRecord,
  IBehaviors,
  IBehaviorTag,
  IDecoratorBehaviorOptions,
} from '../types/behavior.js';
import { Composer } from '../lib/composer.js';

@Bean()
export class BeanBehavior extends BeanBase {
  @Use()
  $$beanOnion: BeanOnion;

  protected async __init__() {}

  public async createComposer(behaviors: IBehaviors, behaviorTag: IBehaviorTag): Promise<Composer> {
    // onionItems
    const onionItems = this._prepareOnionItems(behaviors);
    // load onions
    const onions = await this.$$beanOnion.behavior.loadOnions(onionItems);
    // create behaviors
    for (const onion of onions) {
      onion.beanInstance = await this.bean._newBean(onion.beanFullName as any, true);
    }
    // compose
    const composer = this.$$beanOnion.behavior.compose(
      onions,
      (onionSlice, data: IBehaviorComposeData, options, next) => {
        if (!cast(onionSlice.beanInstance)[data.method]) return next();
        if (data.method === 'props') {
          return cast(onionSlice.beanInstance)[data.method](options, data.behaviorTag, next);
        } else {
          return cast(onionSlice.beanInstance)[data.method](data.props, options, data.behaviorTag, next);
        }
      },
    );
    return this.bean._newBeanSimple(Composer, false, composer, behaviorTag);
  }

  private _prepareOnionItems(behaviors: IBehaviors) {
    if (!Array.isArray(behaviors)) behaviors = [behaviors];
    const onionItems: IOnionItem<IDecoratorBehaviorOptions, keyof IBehaviorRecord>[] = [];
    for (const behaviorItem of behaviors) {
      if (typeof behaviorItem === 'string') {
        onionItems.push({ name: behaviorItem as unknown as keyof IBehaviorRecord, options: undefined });
      } else if (typeof behaviorItem === 'object') {
        for (const key in behaviorItem) {
          onionItems.push({ name: key as unknown as keyof IBehaviorRecord, options: behaviorItem[key] });
        }
      }
    }
    return onionItems;
  }
}
