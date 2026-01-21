import type { ZovaSys } from 'zova';
import type { IOpenapiOptionsRestResource } from '../types/restResource.js';

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
          behaviors: {
            formField: 'a-form:formField',
          },
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
    } as IOpenapiOptionsRestResource,
    restResource: {} as IOpenapiOptionsRestResource,
    bootstrapApi: '/api/openapischema/resource/bootstrap/:resource',
  };
};
