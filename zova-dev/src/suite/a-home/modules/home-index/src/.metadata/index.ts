import type { BeanScopeUtil } from 'zova';
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

/** controller: end */
/** controller: begin */
import { ControllerPageHome } from '../page/home/controller.jsx';
/** pages: end */

/** controller: begin */
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../page/home/controller.jsx';
declare module 'zova' {

}
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
export * from '../routes.js';
/** controller: end */
/** pages: begin */
export * from './page/home.js';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/index': undefined;
  }
  export interface IPageNameRecord {

  }
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {

};
declare module 'zova-module-home-index' {

}

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
