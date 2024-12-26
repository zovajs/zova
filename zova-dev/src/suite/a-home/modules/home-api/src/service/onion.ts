import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';








export default (app: ZovaApplication) => {
  return {
    index: (
      
      
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
echo: (
      
      
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
echo2: (
      body: ,
      
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
echo3: (
      
      
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
echo4: (
      body: ,
      
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
echo5: (
      
      
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
  };
};
