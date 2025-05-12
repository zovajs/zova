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

import { ZRestPage } from './component/restPage.js';
/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/restPage/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-devui-restpage' {

  export interface ControllerRestPage {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.controller.restPage': ControllerRestPage;
  }
}
/** controller: end */

/** components: end */
/** render: begin */
export * from '../component/restPage/render.jsx';
export const components = {
  restPage: ZRestPage,
};
declare module 'zova' {
  export interface IComponentRecord {
    'devui-restpage:restPage': ControllerRestPage;
  }
}
/** components: begin */
export * from './component/restPage.js';
declare module 'zova' {

}
declare module 'zova-module-devui-restpage' {

  export interface RenderRestPage {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.render.restPage': RenderRestPage;
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
