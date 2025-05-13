import type { BeanScopeUtil } from 'zova';
/** render: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** controller: begin */
import { ControllerRestTable } from '../component/restTable/controller.jsx';
/** render: end */
/** render: begin */
import { RenderRestTable } from '../component/restTable/render.jsx';

import { ZRestTable } from './component/restTable.js';
/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/restTable/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-devui-resttable' {

  export interface ControllerRestTable {
    /** @internal */
    get scope(): ScopeModuleDevuiResttable;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-resttable.controller.restTable': ControllerRestTable;
  }
}
/** controller: end */

/** components: end */
/** render: begin */
export * from '../component/restTable/render.jsx';
export const components = {
  restTable: ZRestTable,
};
declare module 'zova' {
  export interface IComponentRecord {
    'devui-resttable:restTable': ControllerRestTable;
  }
}
/** components: begin */
export * from './component/restTable.js';
declare module 'zova' {

}
declare module 'zova-module-devui-resttable' {

  export interface RenderRestTable {
    /** @internal */
    get scope(): ScopeModuleDevuiResttable;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-resttable.render.restTable': RenderRestTable;
  }
}

@Scope()
export class ScopeModuleDevuiResttable extends BeanScopeBase {}

export interface ScopeModuleDevuiResttable {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-resttable': ScopeModuleDevuiResttable;
  }

}

/** scope: end */
