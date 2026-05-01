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
            input: 'basic-input:formFieldInput',
            captcha: 'basic-captcha:formFieldCaptcha',
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
            ActionOperationsBulk: 'basic-table:actionOperationsBulk',
            ActionCreate: 'basic-table:actionCreate',
            actionOperationsRow: 'basic-table.tableCell.actionOperationsRow',
            actionView: 'basic-table.tableCell.actionView',
            actionUpdate: 'basic-table.tableCell.actionUpdate',
            actionDelete: 'basic-table.tableCell.actionDelete',
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
