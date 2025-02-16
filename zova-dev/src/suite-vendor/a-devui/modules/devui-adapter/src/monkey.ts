import type { IMonkeyAppInitialize } from 'zova';
import type { ScopeModuleAStyle } from 'zova-module-a-style';
import { BeanSimple } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize {
  async appInitialize() {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'devui-adapter.meta.themeHandler';
  }
}
