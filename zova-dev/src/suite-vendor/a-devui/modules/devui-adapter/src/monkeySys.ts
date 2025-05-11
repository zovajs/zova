import type { IMonkeySysInitialize } from 'zova';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'devui-adapter.meta.themeHandler';
    }
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-rest');
    if (!scopeRestConfig.defaultRestPage) {
      scopeRestConfig.defaultRestPage = 'devui-restpage:restPage';
    }
    if (!scopeRestConfig.defaultRestTable) {
      scopeRestConfig.defaultRestTable = 'devui-resttable:restTable';
    }
    if (!scopeRestConfig.defaultRestForm) {
      scopeRestConfig.defaultRestForm = 'devui-restform:restForm';
    }
  }
}
