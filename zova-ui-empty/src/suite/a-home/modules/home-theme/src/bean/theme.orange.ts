import type { IDecoratorThemeOptions, IThemeApplyParams, IThemeApplyResult, IThemeBase, ThemeToken } from 'zova-module-a-style';

import { BeanThemeBase, Theme } from 'zova-module-a-style';

export interface IThemeOptionsOrange extends IDecoratorThemeOptions {}

@Theme<IThemeOptionsOrange>()
export class ThemeOrange extends BeanThemeBase implements IThemeBase {
  async apply({ name, dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    // token
    const token: ThemeToken = {
      color: {
        'primary': '#dd7f15',
        'secondary': '#26A69A',
        'accent': '#9C27B0',
        'dark': '#1d1d1d',
        'dark-page': '#121212',
        'positive': '#21BA45',
        'negative': '#C10015',
        'info': '#31CCEC',
        'warning': '#F2C037',
      },
    };
    return {
      token: this.mergeOptionsToken({ name, dark }, token),
    };
  }
}
