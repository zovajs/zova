/* eslint-disable */
/** api: begin */
export * from '../api/captcha.js';
export * from '../api/home.js';
export * from '../api/homeBaseMenu.js';
export * from '../api/homeUserPassport.js';
export * from '../api/testSsrToolOne.js';
export * from '../api/testVonaCaptcha.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-api' {
  
        export interface ApiCaptcha {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiCaptcha {
          get $beanFullName(): 'home-api.api.captcha';
          get $onionName(): 'home-api:captcha';
          
        }

        export interface ApiHome {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiHome {
          get $beanFullName(): 'home-api.api.home';
          get $onionName(): 'home-api:home';
          
        }

        export interface ApiHomeBaseMenu {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiHomeBaseMenu {
          get $beanFullName(): 'home-api.api.homeBaseMenu';
          get $onionName(): 'home-api:homeBaseMenu';
          
        }

        export interface ApiHomeUserPassport {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiHomeUserPassport {
          get $beanFullName(): 'home-api.api.homeUserPassport';
          get $onionName(): 'home-api:homeUserPassport';
          
        }

        export interface ApiTestSsrToolOne {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiTestSsrToolOne {
          get $beanFullName(): 'home-api.api.testSsrToolOne';
          get $onionName(): 'home-api:testSsrToolOne';
          
        }

        export interface ApiTestVonaCaptcha {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiTestVonaCaptcha {
          get $beanFullName(): 'home-api.api.testVonaCaptcha';
          get $onionName(): 'home-api:testVonaCaptcha';
          
        } 
}
/** api: end */
/** api: begin */
import { ApiCaptcha } from '../api/captcha.js';
import { ApiHome } from '../api/home.js';
import { ApiHomeBaseMenu } from '../api/homeBaseMenu.js';
import { ApiHomeUserPassport } from '../api/homeUserPassport.js';
import { ApiTestSsrToolOne } from '../api/testSsrToolOne.js';
import { ApiTestVonaCaptcha } from '../api/testVonaCaptcha.js';
export interface IModuleApi {
  'captcha': ApiCaptcha;
'home': ApiHome;
'homeBaseMenu': ApiHomeBaseMenu;
'homeUserPassport': ApiHomeUserPassport;
'testSsrToolOne': ApiTestSsrToolOne;
'testVonaCaptcha': ApiTestVonaCaptcha;
}
/** api: end */
/** api: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.api.captcha': ApiCaptcha;
'home-api.api.home': ApiHome;
'home-api.api.homeBaseMenu': ApiHomeBaseMenu;
'home-api.api.homeUserPassport': ApiHomeUserPassport;
'home-api.api.testSsrToolOne': ApiTestSsrToolOne;
'home-api.api.testVonaCaptcha': ApiTestVonaCaptcha;
  }
}
/** api: end */
/** openapi: begin */
export * from '../api/openapi/index.js';
/** openapi: end */
/** apiMeta: begin */
export * from '../apiMeta/captcha.js';
export * from '../apiMeta/home.js';
export * from '../apiMeta/homeBaseMenu.js';
export * from '../apiMeta/homeUserPassport.js';
export * from '../apiMeta/testSsrToolOne.js';
export * from '../apiMeta/testVonaCaptcha.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-api' {
  
        export interface ApiMetaCaptcha {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiMetaCaptcha {
          get $beanFullName(): 'home-api.apiMeta.captcha';
          get $onionName(): 'home-api:captcha';
          
        }

        export interface ApiMetaHome {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiMetaHome {
          get $beanFullName(): 'home-api.apiMeta.home';
          get $onionName(): 'home-api:home';
          
        }

        export interface ApiMetaHomeBaseMenu {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiMetaHomeBaseMenu {
          get $beanFullName(): 'home-api.apiMeta.homeBaseMenu';
          get $onionName(): 'home-api:homeBaseMenu';
          
        }

        export interface ApiMetaHomeUserPassport {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiMetaHomeUserPassport {
          get $beanFullName(): 'home-api.apiMeta.homeUserPassport';
          get $onionName(): 'home-api:homeUserPassport';
          
        }

        export interface ApiMetaTestSsrToolOne {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiMetaTestSsrToolOne {
          get $beanFullName(): 'home-api.apiMeta.testSsrToolOne';
          get $onionName(): 'home-api:testSsrToolOne';
          
        }

        export interface ApiMetaTestVonaCaptcha {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiMetaTestVonaCaptcha {
          get $beanFullName(): 'home-api.apiMeta.testVonaCaptcha';
          get $onionName(): 'home-api:testVonaCaptcha';
          
        } 
}
/** apiMeta: end */
/** apiMeta: begin */
import { ApiMetaCaptcha } from '../apiMeta/captcha.js';
import { ApiMetaHome } from '../apiMeta/home.js';
import { ApiMetaHomeBaseMenu } from '../apiMeta/homeBaseMenu.js';
import { ApiMetaHomeUserPassport } from '../apiMeta/homeUserPassport.js';
import { ApiMetaTestSsrToolOne } from '../apiMeta/testSsrToolOne.js';
import { ApiMetaTestVonaCaptcha } from '../apiMeta/testVonaCaptcha.js';
export interface IModuleApiMeta {
  'captcha': ApiMetaCaptcha;
'home': ApiMetaHome;
'homeBaseMenu': ApiMetaHomeBaseMenu;
'homeUserPassport': ApiMetaHomeUserPassport;
'testSsrToolOne': ApiMetaTestSsrToolOne;
'testVonaCaptcha': ApiMetaTestVonaCaptcha;
}
/** apiMeta: end */
/** apiMeta: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.apiMeta.captcha': ApiMetaCaptcha;
'home-api.apiMeta.home': ApiMetaHome;
'home-api.apiMeta.homeBaseMenu': ApiMetaHomeBaseMenu;
'home-api.apiMeta.homeUserPassport': ApiMetaHomeUserPassport;
'home-api.apiMeta.testSsrToolOne': ApiMetaTestSsrToolOne;
'home-api.apiMeta.testVonaCaptcha': ApiMetaTestVonaCaptcha;
  }
}
/** apiMeta: end */
/** apiSchema: begin */
export * from '../apiSchema/captcha.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-api' {
  
        export interface ApiSchemaCaptcha {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ApiSchemaCaptcha {
          get $beanFullName(): 'home-api.apiSchema.captcha';
          get $onionName(): 'home-api:captcha';
          
        } 
}
/** apiSchema: end */
/** apiSchema: begin */
import { ApiSchemaCaptcha } from '../apiSchema/captcha.js';
export interface IModuleApiSchema {
  'captcha': ApiSchemaCaptcha;
}
/** apiSchema: end */
/** apiSchema: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.apiSchema.captcha': ApiSchemaCaptcha;
  }
}
/** apiSchema: end */
/** service: begin */
export * from '../service/jwtAdapter.js';

import 'zova-module-a-bean';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'home-api:jwtAdapter': never;
    }

  
}
declare module 'zova-module-home-api' {
  
        export interface ServiceJwtAdapter {
          /** @internal */
          get scope(): ScopeModuleHomeApi;
        }

        export interface ServiceJwtAdapter {
          get $beanFullName(): 'home-api.service.jwtAdapter';
          get $onionName(): 'home-api:jwtAdapter';
          
        } 
}
/** service: end */
/** service: begin */
import { ServiceJwtAdapter } from '../service/jwtAdapter.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.service.jwtAdapter': ServiceJwtAdapter;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeApi extends BeanScopeBase {}

export interface ScopeModuleHomeApi {
  util: BeanScopeUtil;
api: IModuleApi;
apiMeta: IModuleApiMeta;
apiSchema: IModuleApiSchema;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }
  
  

  

  
}
  
/** scope: end */
