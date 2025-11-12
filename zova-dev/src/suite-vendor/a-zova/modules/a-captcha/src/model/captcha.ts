import type { IDecoratorModelOptions } from 'zova-module-a-model';
import { BeanModelBase, Model } from 'zova-module-a-model';

export interface IModelOptionsCaptcha extends IDecoratorModelOptions {}

@Model<IModelOptionsCaptcha>()
export class ModelCaptcha extends BeanModelBase {
  protected async __init__() {}
}
