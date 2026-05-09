import type { ZovaSys } from 'zova';

import { IResourceProviders } from 'zova-module-a-openapi';

export const config = (_sys: ZovaSys) => {
  const resourceProviders: IResourceProviders = {
    behaviors: {
      FormField: 'basic-form:formField',
      FormFieldLayout: 'basic-form:formFieldLayout',
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
    } as any,
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
