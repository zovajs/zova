import type { IThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import type { ThemeToken } from 'zova-module-home-base';
import { BeanBase } from 'zova';
import { Theme } from 'zova-module-a-style';

@Theme()
export class ThemeOrange extends BeanBase implements IThemeBase {
  async apply({ name: _name, dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    const token: ThemeToken = {
      color: {
        primary: '#f28238',
      },
      var: {
        borderColor: '#f28d49',
      },
      component: {
        page: {
          background: dark ? 'oklch(25.33% 0.016 252.42)' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      },
    };
    return { token };
  }
}
