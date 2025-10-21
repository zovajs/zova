import type { IMonkeyAppInitialize } from 'zova';
import type { ScopeModuleAStyle } from 'zova-module-a-style';
import { BeanSimple } from 'zova';
import { LocalIcon } from './bean/local.icon.jsx';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize {
  async appInitialize() {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'element-adapter:themeHandler';
    // icon
    const localIcon = await this.bean._newBean(LocalIcon, false);
    await localIcon.initialize();
  }
}
