import type { IMonkeySysInitialize } from 'zova';
import type { IOpenapiOptionsResourceMeta } from 'zova-module-a-openapi';
import { VInput } from 'vuetify/components';
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
        components: {
          // restPage: 'devui-restpage:restPage',
          // restPageEntry: 'devui-restpage:restPageEntry',
          // table: 'devui-table:table',
        },
      },
      form: {
        provider: {
          components: {
            text: VInput,
            captcha: 'quasar-form:formFieldCaptcha',
          },
          behaviors: {
            formField: 'quasar-form:formField',
            formFieldLayout: 'quasar-form:formFieldLayout',
          },
        },
      },
      table: {
        provider: {
          components: {
            // actionOperationsTable: 'devui-table:actionOperationsTable',
            // actionOperationsRow: 'devui-table.tableCell.actionOperationsRow',
            // actionView: 'devui-table.tableCell.actionView',
          },
          actions: {
            // actionCreate: 'rest-actions:create',
            // actionView: 'rest-actions:view',
            // actionEdit: 'rest-actions:edit',
            // actionDelete: 'rest-actions:delete',
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
