import type { ZovaSys } from 'zova';

import { IResourceProviders } from '../types/resourceProviders.js';

export const config = (_sys: ZovaSys) => {
  return {
    resourceProviders: {} as IResourceProviders,
    api: {
      bootstrap: '/api/openapischema/resource/bootstrap/:resource',
      permissions: '/api/home/base/permission/:resource',
    },
  };
};
