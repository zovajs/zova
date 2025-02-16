/** scope: begin */
import type { BeanScopeUtil } from 'zova';
/** controller: end */
/** controller: begin */
import type { ControllerPageHome } from '../page/home/controller.jsx';
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

/** controller: begin */
import 'zova';
/** pages: end */

import 'zova';
import 'zova';

import 'zova';

export * from '../page/home/controller.jsx';
declare module 'zova' {}
declare module 'zova-module-home-index' {
  export interface ControllerPageHome {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-index.controller.pageHome': ControllerPageHome;
  }
}
/** controller: end */
/** pages: begin */

export * from '../routes.js';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/index': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
declare module 'zova-module-home-index' {}

@Scope()
export class ScopeModuleHomeIndex extends BeanScopeBase {}

export interface ScopeModuleHomeIndex {
  util: BeanScopeUtil;
}
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-index': ScopeModuleHomeIndex;
  }
}

/** scope: end */
