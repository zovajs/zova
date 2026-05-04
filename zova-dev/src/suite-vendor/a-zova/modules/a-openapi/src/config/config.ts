import type { ZovaSys } from 'zova';

import type { IOpenapiOptionsResourceMeta } from '../types/resourceMeta.js';

export const config = (_sys: ZovaSys) => {
  return {
    base: {
      provider: {
        components: {
          Form: 'a-form:form',
          Table: 'a-table:table',
        },
        actions: {
          ActionLog: 'a-actions:log',
        },
      },
      form: {
        provider: {
          components: {
            FormField: 'a-form:formField',
            Input: 'input',
          },
          behaviors: {},
        },
      },
      table: {
        provider: {
          components: {},
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
