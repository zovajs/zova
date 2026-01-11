import type { ZovaSys } from 'zova';
import type { IOpenApiOptionsRestResource } from '../types/restResource.js';

export const config = (_sys: ZovaSys) => {
  return {
    restResource: {} as IOpenApiOptionsRestResource,
    bootstrapApi: '/api/openapischema/resource/bootstrap/:resource',
  };
};
