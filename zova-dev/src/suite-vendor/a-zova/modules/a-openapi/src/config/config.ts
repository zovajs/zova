import type { ZovaSys } from 'zova';

import { IResourceProviders } from '../types/resourceProviders.js';

export const config = (_sys: ZovaSys) => {
  return {
    base: {
      formFields: {
        Input: 'input' as never,
      },
    } as IResourceProviders,
    resourceMeta: {} as IOpenapiOptionsResourceMeta,
    api: {
      bootstrap: '/api/openapischema/resource/bootstrap/:resource',
      permissions: '/api/home/base/permission/:resource',
    },
  };
};
