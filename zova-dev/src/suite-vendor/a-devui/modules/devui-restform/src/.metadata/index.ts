import type { BeanScopeUtil } from 'zova';
/** render: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** controller: begin */
import { ControllerRestForm } from '../component/restForm/controller.jsx';
/** render: end */
/** render: begin */
import { RenderRestForm } from '../component/restForm/render.jsx';

import { ZRestForm } from './component/restForm.js';
/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/restForm/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-devui-restform' {

  export interface ControllerRestForm {
    /** @internal */
    get scope(): ScopeModuleDevuiRestform;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restform.controller.restForm': ControllerRestForm;
  }
}
/** controller: end */

/** components: end */
/** render: begin */
export * from '../component/restForm/render.jsx';
export const components = {
  restForm: ZRestForm,
};
declare module 'zova' {
  export interface IComponentRecord {
    'devui-restform:restForm': ControllerRestForm;
  }
}
/** components: begin */
export * from './component/restForm.js';
declare module 'zova' {

}
declare module 'zova-module-devui-restform' {

  export interface RenderRestForm {
    /** @internal */
    get scope(): ScopeModuleDevuiRestform;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restform.render.restForm': RenderRestForm;
  }
}

@Scope()
export class ScopeModuleDevuiRestform extends BeanScopeBase {}

export interface ScopeModuleDevuiRestform {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-restform': ScopeModuleDevuiRestform;
  }

}

/** scope: end */
