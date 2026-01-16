import type { IDecoratorModelOptions } from 'zova-module-a-model';
import { BeanModelBase, Model } from 'zova-module-a-model';
import { ModelStackOptions } from '../types/stack.js';

export interface IModelOptionsStack extends IDecoratorModelOptions {}

@Model<IModelOptionsStack>()
export class ModelStack extends BeanModelBase {
  stackOptions: ModelStackOptions;
  tabs: RouteTab[];
  protected async __init__() {}
}
