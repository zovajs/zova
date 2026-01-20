import type { IMonkeySysInitialize } from 'zova';
import type { IOpenApiOptionsRestResource } from 'zova-module-a-openapi';
import { BeanSimple, deepExtend } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // defaultThemeHandler
    const scopeStyleConfig = this.sys.util.getModuleConfigSafe('a-style');
    if (!scopeStyleConfig.defaultThemeHandler) {
      scopeStyleConfig.defaultThemeHandler = 'devui-adapter:themeHandler';
    }
    // config custom
    const configCustom: IOpenApiOptionsRestResource = {
      permissions: {
        table: { create: true },
        row: { update: true, delete: true },
      },
      provider: {
        components: {
          restPage: 'devui-restpage:restPage',
          restPageEntry: 'devui-restpageentry:restPageEntry',
          table: 'devui-table:table',
        },
      },
      form: {
        provider: {
          components: {
            formField: 'a-form:formField',
            text: 'input',
            password: 'input',
            currency: 'a-currency:formFieldCurrency',
            dateRange: 'a-date:formFieldDateRange',
          },
          behaviors: {
            formField: 'a-form:formField',
            formFieldLayout: 'devui-form:formFieldLayout',
          },
        },
      },
      table: {
        provider: {
          components: {
            actionView: 'devui-tableaction.tableCell.actionView',
            currency: 'a-currency.tableCell.currency',
            date: 'a-date.tableCell.date',
          },
          actions: {
            actionView: 'rest-actions:view',
          },
        },
      },
    };
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-openapi');
    const scopeRestConfigOriginal = this.sys.util.getModuleConfigOriginal('a-openapi');
    scopeRestConfig.restResource = deepExtend(
      {},
      scopeRestConfigOriginal.restResource,
      configCustom,
      scopeRestConfig.restResource,
    );
  }
}
