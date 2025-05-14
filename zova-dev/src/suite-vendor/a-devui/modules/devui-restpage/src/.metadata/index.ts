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
import { ControllerWrapperForm } from '../component/wrapperForm/controller.jsx';
import { RenderWrapperForm } from '../component/wrapperForm/render.jsx';
import { ControllerWrapperTable } from '../component/wrapperTable/controller.jsx';
import { RenderWrapperTable } from '../component/wrapperTable/render.jsx';

import { ZRestPage } from './component/restPage.js';
import { ZWrapperForm } from './component/wrapperForm.js';
import { ZWrapperTable } from './component/wrapperTable.js';
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
export * from '../component/wrapperForm/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-devui-restpage' {

  export interface ControllerRestPage {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }

  export interface ControllerWrapperForm {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }

  export interface ControllerWrapperTable {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.controller.restPage': ControllerRestPage;
    'devui-restpage.controller.wrapperForm': ControllerWrapperForm;
    'devui-restpage.controller.wrapperTable': ControllerWrapperTable;
  }
}
/** controller: end */

export * from '../component/wrapperForm/render.jsx';
export * from '../component/wrapperTable/controller.jsx';
export * from '../component/wrapperTable/render.jsx';
export const components = {
  restPage: ZRestPage,
  wrapperForm: ZWrapperForm,
  wrapperTable: ZWrapperTable,
};
declare module 'zova' {
  export interface IComponentRecord {
    'devui-restpage:restPage': ControllerRestPage;
    'devui-restpage:wrapperForm': ControllerWrapperForm;
    'devui-restpage:wrapperTable': ControllerWrapperTable;
  }
}
/** components: begin */
export * from './component/restPage.js';
export * from './component/wrapperForm.js';
export * from './component/wrapperTable.js';
declare module 'zova' {

}
declare module 'zova-module-devui-restpage' {

  export interface RenderRestPage {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }

  export interface RenderWrapperForm {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }

  export interface RenderWrapperTable {
    /** @internal */
    get scope(): ScopeModuleDevuiRestpage;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.render.restPage': RenderRestPage;
    'devui-restpage.render.wrapperForm': RenderWrapperForm;
    'devui-restpage.render.wrapperTable': RenderWrapperTable;
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
