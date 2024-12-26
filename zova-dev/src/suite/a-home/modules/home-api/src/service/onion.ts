import { ZovaApplication } from 'zova';
import type { paths } from './_openapi_.js';
import { IApiServiceActionOptions } from '../types.js';

/** Onion_index */
export const ServiceServiceOnionindexPath = '/api/';
export type ServiceServiceOnionindexPath = '/api/' 
export type ServiceServiceOnionindexMethod = 'get';
/** Onion_echo */
export const ServiceServiceOnionechoPath = '/echo';
export type ServiceServiceOnionechoPath = '/echo' 
export type ServiceServiceOnionechoMethod = 'get';
/** Onion_echo2 */
export const ServiceServiceOnionecho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}';
export type ServiceServiceOnionecho2Path = '/api/vona/test/onion/echo2/{userId}/{userName}' 
export type ServiceServiceOnionecho2Method = 'post';
export type ServiceServiceOnionecho2Params = paths[ServiceServiceOnionecho2Path][ServiceServiceOnionecho2Method]['parameters']['path'];
/** Onion_echo3 */
export const ServiceServiceOnionecho3Path = '/api/vona/test/onion/echo3/{userId}';
export type ServiceServiceOnionecho3Path = '/api/vona/test/onion/echo3/{userId}' 
export type ServiceServiceOnionecho3Method = 'get';
export type ServiceServiceOnionecho3Params = paths[ServiceServiceOnionecho3Path][ServiceServiceOnionecho3Method]['parameters']['path'];
/** Onion_echo4 */
export const ServiceServiceOnionecho4Path = '/api/vona/test/onion/echo4';
export type ServiceServiceOnionecho4Path = '/api/vona/test/onion/echo4' 
export type ServiceServiceOnionecho4Method = 'post';
/** Onion_echo5 */
export const ServiceServiceOnionecho5Path = '/api/vona/test/onion/echo5';
export type ServiceServiceOnionecho5Path = '/api/vona/test/onion/echo5' 
export type ServiceServiceOnionecho5Method = 'get';

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
      
    options?: {
        
      } & IApiServiceActionOptions,
    
    ) =>
      app.meta.$api.post<any, ServiceOnionEcho2ResponseBody>(
        app.util.apiTranslatePath(ServiceOnionEcho2Path, options?.params),
        body,
        app.util.apiInvokeConfig(options),
      ),
echo3: (
      
      
    options?: {
        
      },
    
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
