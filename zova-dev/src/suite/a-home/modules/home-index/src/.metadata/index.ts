/** controller: begin */
export * from '../page/index/controller.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-index' {
  export interface ControllerPageIndex {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }
}
/** controller: end */
/** controller: begin */
import { ControllerPageIndex } from '../page/index/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-index.controller.pageIndex': ControllerPageIndex;
  }
}
/** controller: end */
/** pages: begin */

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
declare module 'zova-module-home-index' {}

/** pages: end */

/** components: begin */

export const components = {};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {}
}
declare module 'zova-module-home-index' {}
/** components: end */
/** render: begin */
export * from '../page/index/render.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-index' {
  export interface RenderPageIndex {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }
}
/** render: end */
/** render: begin */
import { RenderPageIndex } from '../page/index/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-index.render.pageIndex': RenderPageIndex;
  }
}
/** render: end */
/** renders: begin */
declare module 'zova-module-home-index' {
  export interface RenderPageIndex extends ControllerPageIndex {}
}
/** renders: end */
/** style: begin */
export * from '../page/index/style.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-index' {
  export interface StyleIndex {
    /** @internal */
    get scope(): ScopeModuleHomeIndex;
  }
}
/** style: end */
/** style: begin */
import { StyleIndex } from '../page/index/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-index.style.index': StyleIndex;
  }
}
/** style: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeIndex extends BeanScopeBase {}

export interface ScopeModuleHomeIndex {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-index': ScopeModuleHomeIndex;
  }
}

/** scope: end */
