// eslint-disable
/** controller: begin */
export * from '../component/formFieldSelect/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-select' {
  
        export interface ControllerFormFieldSelect {
          /** @internal */
          get scope(): ScopeModuleBasicSelect;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerFormFieldSelect } from '../component/formFieldSelect/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-select.controller.formFieldSelect': ControllerFormFieldSelect;
  }
}
/** controller: end */

/** components: begin */
export * from './component/formFieldSelect.js';
import { ZFormFieldSelect } from './component/formFieldSelect.js';
export const components = {
  'formFieldSelect': ZFormFieldSelect,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-select:formFieldSelect': ControllerFormFieldSelect;
}
export interface IZovaComponentRecord {
  'basic-select:formFieldSelect': typeof ZFormFieldSelect;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicSelect extends BeanScopeBase {}

export interface ScopeModuleBasicSelect {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-select': ScopeModuleBasicSelect;
  }
  
  

  

  
}
  
/** scope: end */
