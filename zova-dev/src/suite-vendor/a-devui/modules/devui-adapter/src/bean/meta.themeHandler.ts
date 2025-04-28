import type { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';
import { BeanBase, UseScope } from 'zova';
import { Meta } from 'zova-module-a-meta';
import { ScopeModuleASsr } from 'zova-module-a-ssr';

const __Themes = { 'demo-basic.theme.orange': 'orange', 'home-base.theme.default': '' };

@Meta()
export class MetaThemeHandler extends BeanBase implements IThemeHandler {
  @UseScope()
  $$scopeSsr: ScopeModuleASsr;

  async apply({ name, dark, token: _token }: IThemeHandlerApplyParams): Promise<void> {
    // themeName
    const _names: string[] = [];
    const _name = __Themes[name];
    if (_name) _names.push(_name);
    _names.push(dark ? 'dark' : 'light');
    const themeName = _names.join('-');
    // data-theme
    if (process.env.CLIENT) {
      // client
      const body = window?.document?.body;
      if (body) {
        body.setAttribute('data-theme', themeName);
      }
    } else {
      // server
      if (!this.$$scopeSsr.config.cookieThemeDark) {
        this.$useMeta({ bodyAttr: { [`data-ssr-theme-dark-${dark}`]: themeName } });
      } else {
        this.$useMeta({ bodyAttr: { 'data-theme': themeName } });
      }
    }
  }
}
