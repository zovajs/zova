import type { IMonkeySysInitialize } from 'zova';
import type { IOpenapiOptionsResourceMeta } from 'zova-module-a-openapi';

import { QInput } from 'quasar';
import { BeanSimple, deepExtend } from 'zova';

import { SysIcon } from './bean/sys.icon.js';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'quasar-adapter:themeHandler';
    }
    // icon
    const sysIcon = await this.bean._newBean(SysIcon, false);
    await sysIcon.initialize();
    // config custom
    const configCustom: IOpenapiOptionsResourceMeta = {
      provider: {
        components: {},
      },
      form: {
        provider: {
          components: {
            Input: QInput,
            Captcha: 'quasar-form:formFieldCaptcha',
          },
          behaviors: {
            FormField: 'quasar-form:formField',
            FormFieldLayout: 'quasar-form:formFieldLayout',
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
    scopeRestConfig.resourceMeta = deepExtend({}, scopeRestConfig.base, configCustom, scopeRestConfig.resourceMeta);
  }
}
