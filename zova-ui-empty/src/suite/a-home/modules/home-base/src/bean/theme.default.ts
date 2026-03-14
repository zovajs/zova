import type { IDecoratorThemeOptions, IThemeApplyParams, IThemeApplyResult, IThemeBase, ThemeToken } from 'zova-module-a-style';
import { BeanThemeBase, Theme } from 'zova-module-a-style';

export interface IThemeOptionsDefault extends IDecoratorThemeOptions {}

@Theme<IThemeOptionsDefault>()
export class ThemeDefault extends BeanThemeBase implements IThemeBase {
  async apply({ name, dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    // token
    const token: ThemeToken = {};
    return {
      token: this.mergeOptionsToken({ name, dark }, token),
    };
  }
}
