import type { IDecoratorThemeOptions, IThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import type { ThemeToken } from 'zova-module-home-base';
import { BeanBase, deepExtend, PowerPartial } from 'zova';
import { Theme } from 'zova-module-a-style';

export interface IThemeOptionsOrange extends IDecoratorThemeOptions {
  token?: (params: IThemeApplyParams) => PowerPartial<ThemeToken>;
}

@Theme<IThemeOptionsOrange>()
export class ThemeOrange extends BeanBase implements IThemeBase {
  async apply({ name, dark }: IThemeApplyParams): Promise<IThemeApplyResult> {
    const options = this.$onionOptions as IThemeOptionsOrange;
    const tokenConfig = options.token?.({ name, dark });
    let token: ThemeToken = {
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
    if (tokenConfig) {
      token = deepExtend(token, tokenConfig);
    }
    return { token };
  }
}
