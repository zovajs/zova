import { BeanBase, Cast, ThemeHandler } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';

@ThemeHandler()
export class ThemeHandlerDefault extends BeanBase<ScopeModule> implements IThemeHandler {
  async apply({ name, dark, token }: IThemeHandlerApplyParams): Promise<void> {
    // theme
    Cast(this.$vuetify.theme.global).name = name;
    Cast(this.$vuetify.theme.themes)[name] = token;
    if (process.env.SERVER) {
      // no matter that cookie or not
      this.$ssr.state[`data-ssr-theme-dark-${dark}`] = this.$vuetify.theme.styles;
      this.$ssr.state['data-ssr-theme-name'] = name;
      this.$ssr.state[`data-ssr-theme-token-${dark}`] = token;
    }
  }
}
