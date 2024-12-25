import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';
export interface ServiceOnionEchoResult {
  message: string;
}

export default (app: ZovaApplication) => {
  return {
    echo2: (
      body: paths['/api/vona/test/onion/echo2/{userId}/{userName}']['post']['requestBody']['content']['application/json'],
      options?: {
        params?: paths['/api/vona/test/onion/echo2/{userId}/{userName}']['post']['parameters']['path'];
        query?: paths['/api/vona/test/onion/echo2/{userId}/{userName}']['post']['parameters']['query'];
        headers?: paths['/api/vona/test/onion/echo2/{userId}/{userName}']['post']['parameters']['header'];
      },
    ) =>
      app.meta.$api.post<
        any,
        paths['/api/vona/test/onion/echo2/{userId}/{userName}']['post']['responses']['200']['content']['application/json']['data']
      >(
        app.util.apiTranslatePath('/api/vona/test/onion/echo2/{userId}/{userName}', options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
  };
};
