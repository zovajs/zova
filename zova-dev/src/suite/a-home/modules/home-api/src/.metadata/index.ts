import type { BeanScopeUtil } from 'zova';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** api: end */
/** api: begin */
import { ApiHome } from '../api/home.js';
import { ApiHomeBaseMenu } from '../api/homeBaseMenu.js';
/** api: end */
/** api: begin */

import { ApiHomeUserPassport } from '../api/homeUserPassport.js';

import { ApiTestSsrToolOne } from '../api/testSsrToolOne.js';
/** service: end */
/** service: begin */
import { ServiceJwtAdapter } from '../service/jwtAdapter.js';
/** api: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../api/home.js';
export * from '../api/homeBaseMenu.js';
export * from '../api/homeUserPassport.js';
/** api: end */
/** openapi: begin */
export * from '../api/openapi/index.js';
declare module 'zova' {

}
declare module 'zova-module-home-api' {

  export interface ApiHome {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiHomeBaseMenu {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiHomeUserPassport {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiTestSsrToolOne {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }
}
export interface IModuleApi {
  home: ApiHome;
  homeBaseMenu: ApiHomeBaseMenu;
  homeUserPassport: ApiHomeUserPassport;
  testSsrToolOne: ApiTestSsrToolOne;
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.api.home': ApiHome;
    'home-api.api.homeBaseMenu': ApiHomeBaseMenu;
    'home-api.api.homeUserPassport': ApiHomeUserPassport;
    'home-api.api.testSsrToolOne': ApiTestSsrToolOne;
  }
}
export * from '../api/testSsrToolOne.js';
/** openapi: end */
/** service: begin */
export * from '../service/jwtAdapter.js';
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
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.service.jwtAdapter': ServiceJwtAdapter;
  }
}

@Scope()
export class ScopeModuleHomeApi extends BeanScopeBase {}

export interface ScopeModuleHomeApi {
  util: BeanScopeUtil;
  api: IModuleApi;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }

}

/** scope: end */
