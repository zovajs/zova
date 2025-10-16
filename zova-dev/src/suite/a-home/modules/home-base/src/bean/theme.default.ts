import type { IThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import type { ThemeToken } from '../themeToken.js';
import { BeanBase } from 'zova';
import { Theme } from 'zova-module-a-style';

@Theme()
export class ThemeDefault extends BeanBase implements IThemeBase {
  async apply({ name: _name, dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    const token: ThemeToken = {
      color: {
        primary: 'oklch(45% 0.24 277.023)',
      },
      var: {
        borderColor: '#297acc',
      },
      component: {
        page: {
          background: dark ? '#121212' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      },
    };
    return { token };
  }
}
