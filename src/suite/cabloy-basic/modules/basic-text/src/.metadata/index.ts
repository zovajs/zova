// eslint-disable
/** controller: begin */
export * from '../component/formFieldTextarea/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-text' {
  
        export interface ControllerFormFieldTextarea {
          /** @internal */
          get scope(): ScopeModuleBasicText;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerFormFieldTextarea } from '../component/formFieldTextarea/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-text.controller.formFieldTextarea': ControllerFormFieldTextarea;
  }
}
/** controller: end */

/** components: begin */
export * from './component/formFieldTextarea.js';
import { ZFormFieldTextarea } from './component/formFieldTextarea.js';
export const components = {
  'formFieldTextarea': ZFormFieldTextarea,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-text:formFieldTextarea': ControllerFormFieldTextarea;
}
export interface IZovaComponentRecord {
  'basic-text:formFieldTextarea': typeof ZFormFieldTextarea;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicText extends BeanScopeBase {}

export interface ScopeModuleBasicText {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-text': ScopeModuleBasicText;
  }
  
  

  

  
}
  
/** scope: end */
