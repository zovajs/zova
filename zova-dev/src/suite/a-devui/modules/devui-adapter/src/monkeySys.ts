import type { IMonkeySysInitialize } from 'zova';
import type { IOpenapiOptionsResourceMeta } from 'zova-module-a-openapi';

import { BeanSimple, deepExtend } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'devui-adapter:themeHandler';
    }
    // config custom
    const configCustom: IOpenapiOptionsResourceMeta = {
      provider: {
        components: {},
      },
      form: {
        provider: {
          components: {},
          behaviors: {},
        },
      },
      table: {
        provider: {
          components: {},
          actions: {},
        },
      },
    };
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-openapi');
    scopeRestConfig.resourceMeta = deepExtend(
      {},
      scopeRestConfig.base,
      configCustom,
      scopeRestConfig.resourceMeta,
    );
  }
}
