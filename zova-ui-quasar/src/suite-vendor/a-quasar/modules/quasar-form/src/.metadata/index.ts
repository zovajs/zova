/* eslint-disable */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleQuasarForm extends BeanScopeBase {}

export interface ScopeModuleQuasarForm {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'quasar-form': ScopeModuleQuasarForm;
  }
  
  

  

  
}
  
/** scope: end */
