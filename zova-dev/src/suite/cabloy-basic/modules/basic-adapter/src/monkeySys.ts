import type { IMonkeySysInitialize } from 'zova';
import type { IOpenapiOptionsResourceMeta } from 'zova-module-a-openapi';

import { BeanSimple, deepExtend } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeySysInitialize {
  async sysInitialize() {
    // config custom
    const configCustom: IOpenapiOptionsResourceMeta = {
      provider: {
        components: {
          BlockPage: 'basic-page:blockPage',
          BlockFilter: 'basic-page:blockFilter',
          BlockToolbarBulk: 'basic-page:blockToolbarBulk',
          BlockTable: 'basic-page:blockTable',
          BlockPager: 'basic-page:blockPager',
          BlockPageEntry: 'basic-pageentry:blockPageEntry',
          BlockToolbarRow: 'basic-pageentry:blockToolbarRow',
          BlockForm: 'basic-pageentry:blockForm',
        },
        actions: {
          ActionCreate: 'basic-actions:create',
          ActionView: 'basic-actions:view',
          ActionEdit: 'basic-actions:edit',
          ActionDelete: 'basic-actions:delete',
          ActionLog: 'basic-log:log',
          ActionAlert: 'basic-actions:alert',
          ActionConfirm: 'basic-actions:confirm',
          ActionCopy: 'basic-actions:copy',
          ActionSetValue: 'basic-actions:setValue',
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
            Currency: 'basic-currency:formFieldCurrency',
            Date: 'basic-date:formFieldDate',
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
            Currency: 'basic-currency.tableCell.currency',
            Date: 'basic-date.tableCell.date',
          },
        },
      },
    };
    // rest
    const scopeRestConfig = this.sys.util.getModuleConfigSafe('a-openapi');
    scopeRestConfig.resourceMeta = deepExtend({}, scopeRestConfig.resourceMeta, configCustom);
  }
}
