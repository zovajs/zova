/* eslint-disable */
/** api: begin */
export * from '../api/home.js';
export * from '../api/homeBaseMenu.js';
export * from '../api/homeUserPassport.js';
export * from '../api/testSsrToolOne.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-api' {
  
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
}
/** api: end */
/** api: begin */
import { ApiHome } from '../api/home.js';
import { ApiHomeBaseMenu } from '../api/homeBaseMenu.js';
import { ApiHomeUserPassport } from '../api/homeUserPassport.js';
import { ApiTestSsrToolOne } from '../api/testSsrToolOne.js';
export interface IModuleApi {
  'home': ApiHome;
'homeBaseMenu': ApiHomeBaseMenu;
'homeUserPassport': ApiHomeUserPassport;
'testSsrToolOne': ApiTestSsrToolOne;
}
/** api: end */
/** api: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.api.home': ApiHome;
'home-api.api.homeBaseMenu': ApiHomeBaseMenu;
'home-api.api.homeUserPassport': ApiHomeUserPassport;
'home-api.api.testSsrToolOne': ApiTestSsrToolOne;
  }
}
/** api: end */
/** openapi: begin */
export * from '../api/openapi/index.js';
/** openapi: end */
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
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }
  
  

  

  
}
  
/** scope: end */
