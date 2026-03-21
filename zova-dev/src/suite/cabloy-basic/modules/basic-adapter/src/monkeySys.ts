import type { IMonkeySysInitialize } from 'zova';
import type { IOpenapiOptionsResourceMeta } from 'zova-module-a-openapi';

import { BeanSimple, deepExtend } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // config custom
    const configCustom: IOpenapiOptionsResourceMeta = {
      provider: {
        components: {
          restPage: 'basic-restpage:restPage',
          restPageEntry: 'basic-restpage:restPageEntry',
          table: 'basic-table:table',
        },
      },
      form: {
        provider: {
          components: {
            captcha: 'basic-form:formFieldCaptcha',
            dateRange: 'basic-date:formFieldDateRange',
          },
          behaviors: {
            formField: 'basic-form:formField',
            formFieldLayout: 'basic-form:formFieldLayout',
          },
        },
      },
      table: {
        provider: {
          components: {
            actionOperationsTable: 'basic-table:actionOperationsTable',
            actionOperationsRow: 'basic-table.tableCell.actionOperationsRow',
            actionView: 'basic-table.tableCell.actionView',
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
    scopeRestConfig.resourceMeta = deepExtend({}, scopeRestConfig.resourceMeta, configCustom);
  }
}
