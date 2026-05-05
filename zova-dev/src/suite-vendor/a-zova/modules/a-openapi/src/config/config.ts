import type { ZovaSys } from 'zova';

import type { IOpenapiOptionsResourceMeta } from '../types/resourceMeta.js';

export const config = (_sys: ZovaSys) => {
  return {
    base: {
      provider: {
        components: {},
        actions: {},
      },
      form: {
        provider: {
          components: {
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
