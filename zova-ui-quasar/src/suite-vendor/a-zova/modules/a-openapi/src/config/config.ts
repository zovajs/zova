import type { ZovaSys } from 'zova';
import type { IOpenapiOptionsResourceMeta } from '../types/resourceMeta.js';

export const config = (_sys: ZovaSys) => {
  return {
    base: {
      provider: {
        components: {
          form: 'a-form:form',
          table: 'a-table:table',
        },
        actions: {
          actionLog: 'a-actions:log',
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
          behaviors: {},
        },
      },
      table: {
        provider: {
          components: {
            currency: 'a-currency.tableCell.currency',
            date: 'a-date.tableCell.date',
          },
          actions: {},
        },
      },
    } as IOpenapiOptionsResourceMeta,
    resourceMeta: {} as IOpenapiOptionsResourceMeta,
    api: {
      bootstrap: '/api/openapischema/resource/bootstrap/:resource',
      permissions: '/api/home/base/permission/:resource',
    },
  };
};
