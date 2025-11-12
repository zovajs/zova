/* eslint-disable */
/** api: begin */
export * from '../api/captcha.js';
export * from '../api/testVonaCaptcha.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-captcha' {
  
        export interface ApiCaptcha {
          /** @internal */
          get scope(): ScopeModuleACaptcha;
        }

        export interface ApiCaptcha {
          get $beanFullName(): 'a-captcha.api.captcha';
          get $onionName(): 'a-captcha:captcha';
          
        }

        export interface ApiTestVonaCaptcha {
          /** @internal */
          get scope(): ScopeModuleACaptcha;
        }

        export interface ApiTestVonaCaptcha {
          get $beanFullName(): 'a-captcha.api.testVonaCaptcha';
          get $onionName(): 'a-captcha:testVonaCaptcha';
          
        } 
}
/** api: end */
/** api: begin */
import { ApiCaptcha } from '../api/captcha.js';
import { ApiTestVonaCaptcha } from '../api/testVonaCaptcha.js';
export interface IModuleApi {
  'captcha': ApiCaptcha;
'testVonaCaptcha': ApiTestVonaCaptcha;
}
/** api: end */
/** api: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-captcha.api.captcha': ApiCaptcha;
'a-captcha.api.testVonaCaptcha': ApiTestVonaCaptcha;
  }
}
/** api: end */
/** openapi: begin */
export * from '../api/openapi/index.js';
/** openapi: end */
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
api: IModuleApi;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-captcha': ScopeModuleACaptcha;
  }
  
  

  

  
}
  
/** scope: end */
