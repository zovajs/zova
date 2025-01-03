/** local: begin */
export * from '../page/index/controller.js';
export * from '../page/index/render.jsx';
export * from '../page/index/style.js';

import 'zova';
declare module 'zova' {}
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
/** local: end */
/** local: begin */
import { ControllerPageIndex } from '../page/index/controller.js';
import { RenderIndex } from '../page/index/render.jsx';
import { StyleIndex } from '../page/index/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-index.local.controllerPageIndex': ControllerPageIndex;
    'home-index.local.renderIndex': RenderIndex;
    'home-index.local.styleIndex': StyleIndex;
  }
}
/** local: end */
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
