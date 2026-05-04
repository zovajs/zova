// eslint-disable
/** controller: begin */
export * from '../component/blockPage/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-page' {
  
        export interface ControllerBlockPage {
          /** @internal */
          get scope(): ScopeModuleBasicPage;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerBlockPage } from '../component/blockPage/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-page.controller.blockPage': ControllerBlockPage;
  }
}
/** controller: end */

/** components: begin */
export * from './component/blockPage.js';
import { ZBlockPage } from './component/blockPage.js';
export const components = {
  'blockPage': ZBlockPage,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-page:blockPage': ControllerBlockPage;
}
export interface IZovaComponentRecord {
  'basic-page:blockPage': typeof ZBlockPage;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicPage extends BeanScopeBase {}

export interface ScopeModuleBasicPage {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-page': ScopeModuleBasicPage;
  }
  
  

  

  
}
  
/** scope: end */
