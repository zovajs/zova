import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';

/** Onion_index */
export const ServiceOnionindexPath = '/api/';
export type ServiceOnionindexPath = '/api/' 
export type ServiceOnionindexMethod = 'get';
/** Onion_echo */
export const ServiceOnionechoPath = '/echo';
export type ServiceOnionechoPath = '/echo' 
export type ServiceOnionechoMethod = 'get';
/** Onion_echo2 */
export const ServiceOnionecho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}';
export type ServiceOnionecho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}' 
export type ServiceOnionecho2Method = 'post';
/** Onion_echo3 */
export const ServiceOnionecho3Path = '/api/vona/test/onion/echo3/{userId}';
export type ServiceOnionecho3Path = '/api/vona/test/onion/echo3/{userId}' 
export type ServiceOnionecho3Method = 'get';
/** Onion_echo4 */
export const ServiceOnionecho4Path = '/api/vona/test/onion/echo4';
export type ServiceOnionecho4Path = '/api/vona/test/onion/echo4' 
export type ServiceOnionecho4Method = 'post';
/** Onion_echo5 */
export const ServiceOnionecho5Path = '/api/vona/test/onion/echo5';
export type ServiceOnionecho5Path = '/api/vona/test/onion/echo5' 
export type ServiceOnionecho5Method = 'get';

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
