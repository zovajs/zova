import type { IMonkeySysInitialize } from 'zova';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'quasar-adapter:themeHandler';
    }
    // icon
    const localIcon = await this.bean._newBean(LocalIcon, false);
    await localIcon.initialize();
  }
}
