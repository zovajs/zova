import type { IMonkeySysInitialize } from 'zova';
import type { IFormProvider } from 'zova-module-a-form';
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
      provider: {
        components: {
          restPage: 'devui-restpage:restPage',
          table: 'devui-table:table',
          form: 'a-form:form',
        },
      },
    } satisfies IRestConfig, scopeRestConfig.rest);
    // form
    const scopeFormConfig = this.sys.util.getModuleConfigSafe('a-form');
    scopeFormConfig.formProvider = deepExtend({
      components: {
        formField: 'a-form:formField',
        text: 'input',
      },
      behaviors: {
        formField: 'a-form:formField',
        formFieldLayout: 'devui-restform:formFieldLayout',
        formFieldModel: 'a-form:formFieldModel',
      },
    } satisfies IFormProvider, scopeFormConfig.formProvider);
  }
}
