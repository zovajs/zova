import { BeanBase, cast, UseScope } from 'zova';
import { Meta } from 'zova-module-a-meta';
import { ScopeModuleASsr } from 'zova-module-a-ssr';
import { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';

@Meta()
export class MetaThemeHandler extends BeanBase implements IThemeHandler {
  @UseScope()
  $$scopeSsr: ScopeModuleASsr;

  async apply({ name, dark, token }: IThemeHandlerApplyParams): Promise<void> {
    // theme
    cast(this.$vuetify.theme.themes)[name] = token;
    this.$vuetify.theme.change(name);
    if (process.env.SERVER) {
      // no matter that cookie or not
      this.$ssr.state[`data-ssr-theme-dark-${dark}`] = this.$vuetify.theme.styles;
      this.$ssr.state['data-ssr-theme-name'] = name;
      this.$ssr.state[`data-ssr-theme-token-${dark}`] = token;
    }
    // dataTheme
    const dataTheme = dark ? 'dark' : 'light';
    if (process.env.CLIENT) {
      // client
      this.$useMeta({
        bodyAttr: { 'data-theme': dataTheme },
      });
    } else {
      // server
      if (!this.$$scopeSsr.config.cookieTheme) {
        // donothing
      } else {
        this.$useMeta({
          bodyAttr: { 'data-theme': dataTheme },
        });
      }
    }
  }
}
