/** controller: begin */
export * from '../page/index/controller.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-index' {
  export interface ControllerPageIndex {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }
}
/** controller: end */
/** controller: begin */
import { ControllerPageIndex } from '../page/index/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-index.controller.pageIndex': ControllerPageIndex;
  }
}
/** controller: end */
/** pages: begin */

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/index': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
declare module 'zova-module-home-index' {}
/** pages: end */

/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeIndex extends BeanScopeBase {}

export interface ScopeModuleHomeIndex {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-index': ScopeModuleHomeIndex;
  }
}

/** scope: end */
