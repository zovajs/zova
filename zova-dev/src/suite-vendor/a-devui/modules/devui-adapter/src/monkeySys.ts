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
        components: {
          restPage: 'devui-restpage:restPage',
          restPageEntry: 'devui-restpage:restPageEntry',
          table: 'devui-table:table',
        },
      },
      form: {
        provider: {
          components: {
            captcha: 'devui-form:formFieldCaptcha',
          },
          behaviors: {
            formField: 'devui-form:formField',
            formFieldLayout: 'devui-form:formFieldLayout',
          },
        },
      },
      table: {
        provider: {
          components: {
            actionOperationsTable: 'devui-table:actionOperationsTable',
            actionOperationsRow: 'devui-table.tableCell.actionOperationsRow',
            actionView: 'devui-table.tableCell.actionView',
          },
          actions: {
            actionCreate: 'rest-actions:create',
            actionView: 'rest-actions:view',
            actionEdit: 'rest-actions:edit',
            actionDelete: 'rest-actions:delete',
          },
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
