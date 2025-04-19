import type { BeanScopeUtil } from 'zova';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** service: end */
/** service: begin */
import { ServiceSsrHandler } from '../service/ssrHandler.js';
/** service: begin */
import 'zova';
import 'zova';

import 'zova';

export * from '../service/ssrHandler.js';
declare module 'zova-module-a-bean' {

  export interface IServiceRecord {
    'a-ssrserver:ssrHandler': never;
  }

}
declare module 'zova-module-a-ssrserver' {

  export interface ServiceSsrHandler {
    /** @internal */
    get scope(): ScopeModuleASsrserver;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-ssrserver.service.ssrHandler': ServiceSsrHandler;
  }
}

@Scope()
export class ScopeModuleASsrserver extends BeanScopeBase {}

export interface ScopeModuleASsrserver {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-ssrserver': ScopeModuleASsrserver;
  }

}

/** scope: end */
