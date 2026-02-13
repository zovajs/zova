import type { IMonkeySysInitialize } from 'zova';
import type { IOpenapiOptionsResourceMeta } from 'zova-module-a-openapi';
import { VTextField } from 'vuetify/components/VTextField';
import { BeanSimple, deepExtend } from 'zova';
import { SysIcon } from './bean/sys.icon.js';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'vuetify-adapter:themeHandler';
    }
    // icon
    const localIcon = await this.bean._newBean(SysIcon, false);
    await localIcon.initialize();
    // config custom
    const configCustom: IOpenapiOptionsResourceMeta = {
      provider: {
        components: {},
      },
      form: {
        provider: {
          components: {
            text: VTextField,
            captcha: 'vuetify-form:formFieldCaptcha',
          },
          behaviors: {
            formField: 'vuetify-form:formField',
            formFieldLayout: 'vuetify-form:formFieldLayout',
          },
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
