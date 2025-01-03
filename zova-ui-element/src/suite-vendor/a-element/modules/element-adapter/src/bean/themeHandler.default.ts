import { BeanBase, ThemeHandler, Use } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';
import { ModelTheme } from './model.theme.js';

@ThemeHandler()
export class ThemeHandlerDefault extends BeanBase<ScopeModule> implements IThemeHandler {
  @Use()
  $$modelTheme: ModelTheme;

  async apply({ dark, token }: IThemeHandlerApplyParams): Promise<void> {
    // data
    const brand = {};
    for (const key in token) {
      const key2 = `--el-${key}`;
      brand[key2] = token[key];
      //body.style.setProperty(key2, token[key]);
    }
    const cBrandOld = this.$$modelTheme.cBrand;
    this.$$modelTheme.cBrand = this.$style({
      $nest: {
        '&&': brand,
      },
    });
    // client
    if (process.env.CLIENT) {
      // body
      const body = window.document.documentElement;
      // cBrand
      if (cBrandOld) {
        body.classList.remove(cBrandOld);
      }
      body.classList.add(this.$$modelTheme.cBrand);
      // dark
      if (dark) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    }
    // server
    if (process.env.SERVER) {
      // meta
      const htmlClass = [this.$$modelTheme.cBrand];
      if (dark) {
        htmlClass.push('dark');
      }
      const htmlClassString = htmlClass.join(' ');
      if (!this.app.config.ssr.cookieThemeDark) {
        this.$useMeta({ bodyAttr: { [`data-ssr-theme-dark-${dark}`]: htmlClassString } });
      } else {
        this.$useMeta({ htmlAttr: { class: htmlClassString } });
      }
    }
  }
}
