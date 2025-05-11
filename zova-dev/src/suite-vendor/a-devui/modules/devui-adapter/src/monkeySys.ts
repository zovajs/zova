import type { IMonkeySysInitialize } from 'zova';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    scopeStyleConfig.defaultThemeHandler = 'devui-adapter.meta.themeHandler';
    //
    // this.sys.util.getApiPath
  }
}
