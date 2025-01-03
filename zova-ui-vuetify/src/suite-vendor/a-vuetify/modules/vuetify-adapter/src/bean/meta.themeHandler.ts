import { BeanBase, cast } from 'zova';
import { Meta } from 'zova-module-a-meta';
import { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';

@Meta()
export class MetaThemeHandler extends BeanBase implements IThemeHandler {
  async apply({ name, dark, token }: IThemeHandlerApplyParams): Promise<void> {
    // theme
    cast(this.$vuetify.theme.global).name = name;
    cast(this.$vuetify.theme.themes)[name] = token;
    if (process.env.SERVER) {
      // no matter that cookie or not
      this.$ssr.state[`data-ssr-theme-dark-${dark}`] = this.$vuetify.theme.styles;
      this.$ssr.state['data-ssr-theme-name'] = name;
      this.$ssr.state[`data-ssr-theme-token-${dark}`] = token;
    }
  }
}
