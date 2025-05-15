import type { IMonkeySysInitialize } from 'zova';
import type { IRestConfig } from 'zova-module-a-rest';
import { BeanSimple, deepExtend } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'devui-adapter.meta.themeHandler';
    }
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-rest');
    scopeRestConfig.rest = deepExtend({
      components: {
        page: 'devui-restpage:restPage',
        table: 'devui-resttable:restTable',
        form: 'devui-restform:restForm',
      },
      behaviors: {
        formFieldLayout: 'devui-restform:formFieldLayout',
      },
    } satisfies IRestConfig, scopeRestConfig.rest);
  }
}
