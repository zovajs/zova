import type { IMonkeySysInitialize } from 'zova';
import type { ScopeModuleAStyle } from 'zova-module-a-style';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'devui-adapter.meta.themeHandler';
  }
}
