import type { ZovaSys } from 'zova';
import type { IOpenApiOptionsRestResource } from '../types/restResource.js';

export const config = (_sys: ZovaSys) => {
  return {
    restResource: {
      provider: {
        actions: {
          actionLog: 'a-actions:log',
        },
      },
    } as IOpenApiOptionsRestResource,
    bootstrapApi: '/api/openapischema/resource/bootstrap/:resource',
  };
};
