import type { IMonkeySysInitialize } from 'zova';
import type { IOpenApiOptionsRestResource } from 'zova-module-a-openapi';
import { BeanSimple, deepExtend } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'devui-adapter.meta.themeHandler';
    }
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-openapi');
    scopeRestConfig.restResource = deepExtend({
      permissions: {
        table: { create: true },
        row: { update: true, delete: true },
      },
      provider: {
        components: {
          restPage: 'devui-restpage:restPage',
          table: 'devui-table:table',
          form: 'a-form:form',
        },
      },
      form: {
        provider: {
          components: {
            formField: 'a-form:formField',
            text: 'input',
          },
          behaviors: {
            formField: 'a-form:formField',
            formFieldLayout: 'devui-form:formFieldLayout',
            formFieldModel: 'a-form:formFieldModel',
          },
        },
      },
    } satisfies IOpenApiOptionsRestResource, scopeRestConfig.restResource);
  }
}
