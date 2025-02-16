import type { IThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import type { ThemeToken } from '../themeToken.js';
import { BeanBase } from 'zova';
import { Theme } from 'zova-module-a-style';

@Theme()
export class ThemeDefault extends BeanBase implements IThemeBase {
  async apply({ name: _name, dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    const token: ThemeToken = {
      color: {
        primary: '#1976d2',
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
