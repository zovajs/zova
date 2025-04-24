import type { BeanScopeUtil } from 'zova';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** api: end */
/** api: begin */
import { ApiBTest1 } from '../api/bTest1.js';
import { ApiHome } from '../api/home.js';
import { ApiHomeBaseMenu } from '../api/homeBaseMenu.js';
import { ApiHomeUserPassport } from '../api/homeUserPassport.js';
import { ApiOnion } from '../api/onion.js';
import { ApiTestCabloyPassport } from '../api/testCabloyPassport.js';
/** api: end */
/** api: begin */

import { ApiTestSsrToolOne } from '../api/testSsrToolOne.js';

import { ApiTestVonaUpload } from '../api/testVonaUpload.js';
/** service: end */
/** service: begin */
import { ServiceJwtAdapter } from '../service/jwtAdapter.js';
/** api: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../api/bTest1.js';
export * from '../api/home.js';
export * from '../api/homeBaseMenu.js';
export * from '../api/homeUserPassport.js';
export * from '../api/onion.js';
/** api: end */
/** openapi: begin */
export * from '../api/openapi/index.js';
export * from '../api/testCabloyPassport.js';
export * from '../api/testSsrToolOne.js';
declare module 'zova' {

}
declare module 'zova-module-home-api' {

  export interface ApiBTest1 {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

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

  export interface ApiOnion {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiTestCabloyPassport {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiTestSsrToolOne {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiTestVonaUpload {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }
}
export interface IModuleApi {
  bTest1: ApiBTest1;
  home: ApiHome;
  homeBaseMenu: ApiHomeBaseMenu;
  homeUserPassport: ApiHomeUserPassport;
  onion: ApiOnion;
  testCabloyPassport: ApiTestCabloyPassport;
  testSsrToolOne: ApiTestSsrToolOne;
  testVonaUpload: ApiTestVonaUpload;
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.api.bTest1': ApiBTest1;
    'home-api.api.home': ApiHome;
    'home-api.api.homeBaseMenu': ApiHomeBaseMenu;
    'home-api.api.homeUserPassport': ApiHomeUserPassport;
    'home-api.api.onion': ApiOnion;
    'home-api.api.testCabloyPassport': ApiTestCabloyPassport;
    'home-api.api.testSsrToolOne': ApiTestSsrToolOne;
    'home-api.api.testVonaUpload': ApiTestVonaUpload;
  }
}
export * from '../api/testVonaUpload.js';
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
