import type { BeanScopeUtil } from 'zova';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** api: end */
/** api: begin */
import { ApiAuthPassport } from '../api/authPassport.js';
import { ApiBTest1 } from '../api/bTest1.js';
import { ApiCabloyTestPassport } from '../api/cabloyTestPassport.js';
import { ApiHome } from '../api/home.js';
import { ApiHomeUserPassport } from '../api/homeUserPassport.js';
import { ApiOnion } from '../api/onion.js';
/** api: end */
/** api: begin */

import { ApiUserPassport } from '../api/userPassport.js';

import { ApiVonaTestUpload } from '../api/vonaTestUpload.js';
/** service: end */
/** service: begin */
import { ServiceJwtAdapter } from '../service/jwtAdapter.js';
/** api: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../api/authPassport.js';
export * from '../api/bTest1.js';
export * from '../api/cabloyTestPassport.js';
export * from '../api/home.js';
export * from '../api/homeUserPassport.js';
export * from '../api/onion.js';
/** api: end */
/** openapi: begin */
export * from '../api/openapi/index.js';
export * from '../api/userPassport.js';
declare module 'zova' {

}
declare module 'zova-module-home-api' {

  export interface ApiAuthPassport {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiBTest1 {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiCabloyTestPassport {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiHome {
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

  export interface ApiUserPassport {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiVonaTestUpload {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }
}
export interface IModuleApi {
  authPassport: ApiAuthPassport;
  bTest1: ApiBTest1;
  cabloyTestPassport: ApiCabloyTestPassport;
  home: ApiHome;
  homeUserPassport: ApiHomeUserPassport;
  onion: ApiOnion;
  userPassport: ApiUserPassport;
  vonaTestUpload: ApiVonaTestUpload;
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.api.authPassport': ApiAuthPassport;
    'home-api.api.bTest1': ApiBTest1;
    'home-api.api.cabloyTestPassport': ApiCabloyTestPassport;
    'home-api.api.home': ApiHome;
    'home-api.api.homeUserPassport': ApiHomeUserPassport;
    'home-api.api.onion': ApiOnion;
    'home-api.api.userPassport': ApiUserPassport;
    'home-api.api.vonaTestUpload': ApiVonaTestUpload;
  }
}
export * from '../api/vonaTestUpload.js';
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
