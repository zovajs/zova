import type { IDecoratorModelOptions } from 'zova-module-a-model';
import { BeanModelBase, Model } from 'zova-module-a-model';

export interface IModelOptionsTheme extends IDecoratorModelOptions {}

@Model<IModelOptionsTheme>()
export class ModelTheme extends BeanModelBase {
  cBrand: string;

  protected async __init__() {
    this.cBrand = this.$useStateMem({
      queryKey: ['cBrand'],
    });
  }
}
