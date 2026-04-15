// eslint-disable
/** controller: begin */
export * from '../component/card/controller.jsx';
export * from '../page/component/controller.jsx';
export * from '../page/state/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-demo-basic' {
  
        export interface ControllerCard {
          /** @internal */
          get scope(): ScopeModuleDemoBasic;
        }

        export interface ControllerPageComponent {
          /** @internal */
          get scope(): ScopeModuleDemoBasic;
        }

        export interface ControllerPageState {
          /** @internal */
          get scope(): ScopeModuleDemoBasic;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerCard } from '../component/card/controller.jsx';
import { ControllerPageComponent } from '../page/component/controller.jsx';
import { ControllerPageState } from '../page/state/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-basic.controller.card': ControllerCard;
'demo-basic.controller.pageComponent': ControllerPageComponent;
'demo-basic.controller.pageState': ControllerPageState;
  }
}
/** controller: end */
/** pages: begin */
export * from './page/component.js';
export * from './page/state.js';
export * from '../routes.js';
import { TypePagePathSchema } from 'zova-module-a-router';
import 'zova';
declare module 'zova-module-a-router' {
export interface IPagePathRecord {
  '/demo/basic/component': TypePagePathSchema<undefined,undefined>;
'/demo/basic/state': TypePagePathSchema<undefined,undefined>;
}
export interface IPageNameRecord {
  
}
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {

};
declare module 'zova-module-demo-basic' {
  
}
/** pages: end */

/** components: begin */
export * from './component/card.js';
import { ZCard } from './component/card.js';
export const components = {
  'card': ZCard,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'demo-basic:card': ControllerCard;
}
export interface IZovaComponentRecord {
  'demo-basic:card': typeof ZCard;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDemoBasic extends BeanScopeBase {}

export interface ScopeModuleDemoBasic {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-basic': ScopeModuleDemoBasic;
  }
  
  

  

  
}
  
/** scope: end */
