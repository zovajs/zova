import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { IThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import { ThemeToken } from 'zova-module-home-base';

@Theme()
export class ThemeOrange extends BeanBase<ScopeModule> implements IThemeBase {
  async apply({ name: _name, dark: _dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    // token
    const token: ThemeToken = {
      color: {
        primary: '#dd7f15',
        secondary: '#26A69A',
        accent: '#9C27B0',
        dark: '#1d1d1d',
        'dark-page': '#121212',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037',
      },
    };
    return { token };
  }
}
