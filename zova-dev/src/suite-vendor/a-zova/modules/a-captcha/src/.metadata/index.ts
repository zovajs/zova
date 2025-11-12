/* eslint-disable */
/** model: begin */
export * from '../model/captcha.js';
import { IModelOptionsCaptcha } from '../model/captcha.js';
import 'zova-module-a-model';
declare module 'zova-module-a-model' {
  
    export interface IModelRecord {
      'a-captcha:captcha': IModelOptionsCaptcha;
    }

  
}
declare module 'zova-module-a-captcha' {
  
        export interface ModelCaptcha {
          /** @internal */
          get scope(): ScopeModuleACaptcha;
        }

        export interface ModelCaptcha {
          get $beanFullName(): 'a-captcha.model.captcha';
          get $onionName(): 'a-captcha:captcha';
          get $onionOptions(): IModelOptionsCaptcha;
        } 
}
/** model: end */
/** model: begin */
import { ModelCaptcha } from '../model/captcha.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-captcha.model.captcha': ModelCaptcha;
  }
}
/** model: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleACaptcha extends BeanScopeBase {}

export interface ScopeModuleACaptcha {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-captcha': ScopeModuleACaptcha;
  }
  
  

  

  
}
  
/** scope: end */
