import type { BeanScopeUtil } from 'zova';
/** aopMethod: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** aopMethod: begin */
import { IAopMethodOptionsLog } from '../bean/aopMethod.log.js';
/** aopMethod: end */
/** aopMethod: begin */
import { AopMethodLog } from '../bean/aopMethod.log.js';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/aopMethod.log.js';
declare module 'zova-module-a-bean' {

  export interface IAopMethodRecord {
    'a-logger:log': IAopMethodOptionsLog;
  }

}
declare module 'zova-module-a-logger' {

  export interface AopMethodLog {
    /** @internal */
    get scope(): ScopeModuleALogger;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-logger.aopMethod.log': AopMethodLog;
  }
}

@Scope()
export class ScopeModuleALogger extends BeanScopeBase {}

export interface ScopeModuleALogger {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-logger': ScopeModuleALogger;
  }

}

/** scope: end */
