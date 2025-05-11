import type { BeanScopeUtil } from 'zova';
/** components: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** controller: begin */
import { ControllerRestForm } from '../component/restForm/controller.jsx';
import { ZRestForm } from './component/restForm.js';
/** controller: begin */
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

/** components: begin */
export * from './component/restForm.js';
export const components = {
  restForm: ZRestForm,
};
declare module 'zova' {
  export interface IComponentRecord {
    'devui-restform:restForm': ControllerRestForm;
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
