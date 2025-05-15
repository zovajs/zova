import type { IMonkeySysInitialize } from 'zova';
import type { IRestConfig } from 'zova-module-a-rest';
import defu from 'defu';
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
    defu(scopeRestConfig.rest, {
      components: {
        page: 'devui-restpage:restPage',
        table: 'devui-resttable:restTable',
        form: 'devui-restform:restForm',
      },
    } satisfies IRestConfig);
  }
}
