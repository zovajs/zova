import type { ZovaSys } from 'zova';
import type { IOpenApiOptionsRestResource } from '../types/restResource.js';

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
    } as IOpenApiOptionsRestResource,
    restResource: {} as IOpenApiOptionsRestResource,
    bootstrapApi: '/api/openapischema/resource/bootstrap/:resource',
  };
};
