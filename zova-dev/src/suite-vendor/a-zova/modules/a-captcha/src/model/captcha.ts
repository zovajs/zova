import type { IDecoratorModelOptions } from 'zova-module-a-model';
import { BeanModelBase, Model } from 'zova-module-a-model';

export interface IModelOptionsCaptcha extends IDecoratorModelOptions {}

@Model<IModelOptionsCaptcha>()
export class ModelCaptcha extends BeanModelBase {
  protected async __init__(scene: string) {
    super.__init__(scene);
    if (!scene) throw new Error('scene not specified');
  }

  getCaptchaData() {
    return this.$useStateData({
      queryKey: ['getCaptchaData'],
      queryFn: async () => {
        return this.$api.captcha.create({ scene: this.selector! });
      },
    });
  }
}
