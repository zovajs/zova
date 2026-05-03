import type { IMonkeySysInitialize } from 'zova';
import type { IOpenapiOptionsResourceMeta } from 'zova-module-a-openapi';

import { BeanSimple, deepExtend } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // config custom
    const configCustom: IOpenapiOptionsResourceMeta = {
      provider: {
        components: {
          RestPage: 'basic-restpage:restPage',
          RestPageEntry: 'basic-restpage:restPageEntry',
          Table: 'basic-table:table',
          BlockPageEntry: '',
        },
        actions: {
          ActionCreate: 'rest-actions:create',
          ActionView: 'rest-actions:view',
          ActionEdit: 'rest-actions:edit',
          ActionDelete: 'rest-actions:delete',
        },
      },
      form: {
        provider: {
          components: {
            ActionOperationsRow: 'basic-form:actionOperationsRow',
            ActionSubmit: 'basic-form:actionSubmit',
            ActionBack: 'basic-form:actionBack',
            Input: 'basic-input:formFieldInput',
            Captcha: 'basic-captcha:formFieldCaptcha',
            DateRange: 'basic-date:formFieldDateRange',
          },
          behaviors: {
            FormField: 'basic-form:formField',
            FormFieldLayout: 'basic-form:formFieldLayout',
          },
        },
      },
      table: {
        provider: {
          components: {
            ActionOperationsBulk: 'basic-table:actionOperationsBulk',
            ActionCreate: 'basic-table:actionCreate',
            ActionOperationsRow: 'basic-table.tableCell.actionOperationsRow',
            ActionView: 'basic-table.tableCell.actionView',
            ActionUpdate: 'basic-table.tableCell.actionUpdate',
            ActionDelete: 'basic-table.tableCell.actionDelete',
          },
        },
      },
    };
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-openapi');
    scopeRestConfig.resourceMeta = deepExtend({}, scopeRestConfig.resourceMeta, configCustom);
  }
}
