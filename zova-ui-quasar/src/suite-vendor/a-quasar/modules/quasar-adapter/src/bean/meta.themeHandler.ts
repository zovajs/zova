import { BeanBase, Use, UseScope } from 'zova';
import { Meta } from 'zova-module-a-meta';
import { ScopeModuleASsr } from 'zova-module-a-ssr';
import { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';

import { ModelTheme } from '../model/theme.js';

@Meta()
export class MetaThemeHandler extends BeanBase implements IThemeHandler {
  @Use()
  $$modelTheme: ModelTheme;

  @UseScope()
  $$scopeSsr: ScopeModuleASsr;

  async apply({ name: _name, dark, token }: IThemeHandlerApplyParams): Promise<void> {
    // data
    const brand = {};
    for (const key in token.color) {
      brand[`--q-${key}`] = token.color[key];
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
      const body = window.document.body;
      // cBrand
      if (cBrandOld) {
        body.classList.remove(cBrandOld);
      }
      body.classList.add(this.$$modelTheme.cBrand);
      // dark
      this.$q.dark.set(dark);
    }
    // server
    if (process.env.SERVER) {
      if (!this.$$scopeSsr.config.cookieTheme) {
        const bodyClass = [this.$$modelTheme.cBrand, dark ? 'body--dark' : 'body--light'];
        this.$useMeta({ bodyAttr: { [`data-ssr-theme-dark-${dark}`]: bodyClass.join(',') } });
      } else {
        // dark
        const bodyClass = {
          [this.$$modelTheme.cBrand]: true,
          'body--light': !dark,
          'body--dark': dark,
        };
        // meta
        this.$useMeta({ bodyClass });
      }
    }
  }
}
