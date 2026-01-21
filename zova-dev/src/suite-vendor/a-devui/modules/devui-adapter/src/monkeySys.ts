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
          components: {},
          behaviors: {
            formFieldLayout: 'devui-form:formFieldLayout',
          },
        },
      },
      table: {
        provider: {
          components: {
            actionView: 'devui-tablecell.tableCell.actionView',
          },
          actions: {
            actionView: 'rest-actions:view',
          },
        },
      },
    };
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-openapi');
    scopeRestConfig.restResource = deepExtend(
      {},
      scopeRestConfig.base,
      configCustom,
      scopeRestConfig.restResource,
    );
  }
}
