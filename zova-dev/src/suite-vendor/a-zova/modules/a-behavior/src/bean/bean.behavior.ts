import { BeanBase, cast, Use } from 'zova';
import { Bean, BeanOnion, IOnionItem } from 'zova-module-a-bean';
import {
  IBehaviorExecute,
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
    const onionSlices = await this.$$beanOnion.behavior.loadOnions(onionItems);
    // create behaviors
    for (const onionSlice of onionSlices) {
      onionSlice.beanInstance = await this.bean._getBean(onionSlice.beanFullName as any, true);
    }
    // compose
    const composer = this.$$beanOnion.behavior.compose(onionSlices, (onionSlice, props: any, next) => {
      const beanInstance = cast<IBehaviorExecute>(onionSlice.beanInstance);
      return beanInstance.execute(props, onionSlice.options, behaviorTag, next as any);
    });
    return this.bean._newBeanSimple(Composer, false, composer);
  }

  private _prepareOnionItems(behaviors: IBehaviors) {
    const onionItems: IOnionItem<IDecoratorBehaviorOptions, keyof IBehaviorRecord>[] = [];
    return this._prepareOnionItemsInner(onionItems, behaviors);
  }

  private _prepareOnionItemsInner(
    onionItems: IOnionItem<IDecoratorBehaviorOptions, keyof IBehaviorRecord>[],
    behaviors: IBehaviors,
  ) {
    if (!Array.isArray(behaviors)) behaviors = [behaviors];
    for (const behaviorItem of behaviors) {
      if (typeof behaviorItem === 'string') {
        onionItems.push({ name: behaviorItem as unknown as keyof IBehaviorRecord, options: undefined });
      } else if (Array.isArray(behaviorItem)) {
        this._prepareOnionItemsInner(onionItems, behaviorItem);
      } else if (typeof behaviorItem === 'object') {
        for (const key in behaviorItem) {
          let options = behaviorItem[key];
          if (options === false) continue;
          if (options === true) options = undefined;
          onionItems.push({ name: key as unknown as keyof IBehaviorRecord, options });
        }
      }
    }
    return onionItems;
  }
}
