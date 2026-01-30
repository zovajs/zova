import type { IMonkeySysInitialize } from 'zova';
import { BeanSimple } from 'zova';
import { SysIcon } from './bean/sys.icon.js';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'quasar-adapter:themeHandler';
    }
    // icon
    const localIcon = await this.bean._newBean(SysIcon, false);
    await localIcon.initialize();
  }
}
