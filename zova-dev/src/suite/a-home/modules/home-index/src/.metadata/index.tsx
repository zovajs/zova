/** pages: begin */
export * from '../page/index/controller.js';

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/index': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
/** pages: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeIndex extends BeanScopeBase {}

export interface ScopeModuleHomeIndex extends TypeModuleResource<never, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-index': ScopeModuleHomeIndex;
  }
}
/** scope: end */
/** scope module: begin */
export * from '../page/index/controller.js';
export * from '../page/index/render.jsx';
export * from '../page/index/style.js';
declare module 'zova-module-home-index' {
  export interface ControllerPageIndex {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }

  export interface RenderIndex {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }

  export interface StyleIndex {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }
}
/** scope module: end */
