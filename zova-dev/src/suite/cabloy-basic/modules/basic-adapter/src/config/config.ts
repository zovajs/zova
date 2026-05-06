import type { ZovaSys } from 'zova';

import { IResourceProviders } from 'zova-module-a-openapi';

export const config = (_sys: ZovaSys) => {
  const resourceProviders: IResourceProviders = {
    behaviors: {
      FormField: 'basic-form:formField',
      FormFieldLayout: 'basic-form:formFieldLayout',
    },
    performActions: {
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
    blocks: {
      BlockPage: 'basic-page:blockPage',
      BlockFilter: 'basic-page:blockFilter',
      BlockToolbarBulk: 'basic-page:blockToolbarBulk',
      BlockTable: 'basic-page:blockTable',
      BlockPager: 'basic-page:blockPager',
      BlockPageEntry: 'basic-pageentry:blockPageEntry',
      BlockToolbarRow: 'basic-pageentry:blockToolbarRow',
      BlockForm: 'basic-pageentry:blockForm',
    },
    formFields: {
      Input: 'basic-input:formFieldInput',
      Captcha: 'basic-captcha:formFieldCaptcha',
      DateRange: 'basic-date:formFieldDateRange',
      Currency: 'basic-currency:formFieldCurrency',
      Date: 'basic-date:formFieldDate',
    },
    tableCells: {
      Currency: 'basic-currency.tableCell.currency',
      Date: 'basic-date.tableCell.date',
    },
    table: {
      actionsBulk: {
        ActionCreate: 'basic-table:actionCreate',
      },
      actionsRow: {
        ActionOperationsRow: 'basic-table.tableCell.actionOperationsRow',
        ActionView: 'basic-table.tableCell.actionView',
        ActionUpdate: 'basic-table.tableCell.actionUpdate',
        ActionDelete: 'basic-table.tableCell.actionDelete',
      },
    },
    form: {
      actionsRow: {
        ActionSubmit: 'basic-form:actionSubmit',
        ActionBack: 'basic-form:actionBack',
      },
    },
  };
  return {
    resourceProviders,
  };
};
