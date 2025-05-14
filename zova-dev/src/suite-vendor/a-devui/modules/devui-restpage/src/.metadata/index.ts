import type { BeanScopeUtil } from 'zova';
/** render: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** controller: begin */
import { ControllerRestPage } from '../component/restPage/controller.jsx';
/** render: end */
/** render: begin */
import { RenderRestPage } from '../component/restPage/render.jsx';
import { ControllerTable } from '../component/table/controller.jsx';
import { RenderTable } from '../component/table/render.jsx';

import { ZRestPage } from './component/restPage.js';
import { ZTable } from './component/table.js';
/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/restPage/controller.jsx';
/** components: end */
/** render: begin */
export * from '../component/restPage/render.jsx';
declare module 'zova' {

}
declare module 'zova-module-devui-restpage' {

  export interface ControllerRestPage {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }

  export interface ControllerTable {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.controller.restPage': ControllerRestPage;
    'devui-restpage.controller.table': ControllerTable;
  }
}
/** controller: end */

export * from '../component/table/controller.jsx';
export * from '../component/table/render.jsx';
export const components = {
  restPage: ZRestPage,
  table: ZTable,
};
declare module 'zova' {
  export interface IComponentRecord {
    'devui-restpage:restPage': ControllerRestPage;
    'devui-restpage:table': ControllerTable;
  }
}
/** components: begin */
export * from './component/restPage.js';
export * from './component/table.js';
declare module 'zova' {

}
declare module 'zova-module-devui-restpage' {

  export interface RenderRestPage {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }

  export interface RenderTable {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.render.restPage': RenderRestPage;
    'devui-restpage.render.table': RenderTable;
  }
}

@Scope()
export class ScopeModuleDevuiRestpage extends BeanScopeBase {}

export interface ScopeModuleDevuiRestpage {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-restpage': ScopeModuleDevuiRestpage;
  }

}

/** scope: end */
