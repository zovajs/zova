import type { IDecoratorModelOptions } from 'zova-module-a-model';
import { useComputed } from 'zova';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { ModelStackOptions, RouteTab } from '../types/stack.js';

export interface IModelOptionsStack extends IDecoratorModelOptions {}

@Model<IModelOptionsStack>()
export class ModelStack extends BeanModelBase {
  stackOptions: ModelStackOptions;
  tabs: RouteTab[];
  keepAliveInclude: string[];

  protected async __init__(_scene: string, options: ModelStackOptions) {
    this.bean._setBean('$$modelStack', this);
    // options
    this.stackOptions = this._prepareStackOptions(options);
    // tabs: always []
    this.tabs = [];
    // computed
    this.keepAliveInclude = useComputed(() => {
      return this._getKeepAliveInclude();
    });
  }

  private _prepareStackOptions(options: ModelStackOptions): ModelStackOptions {
    return {
      ...options,
      max: options.max ?? -1,
    };
  }

  private _getKeepAliveInclude() {
    const include: string[] = [];
    for (const tab of this.tabs) {
      if (!include.includes(tab.tabKey)) {
        include.push(tab.tabKey);
      }
    }
    return include;
  }
}
