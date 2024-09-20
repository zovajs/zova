/** beans: begin */
export * from '../bean/bean.api.js';
import { BeanApi } from '../bean/bean.api.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-base.bean.api': BeanApi;
  }
}
/** beans: end */
/** pages: begin */
export * as NSControllerPageErrorNotFound from '../page/errorNotFound/controller.js';

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/base/errorNotFound': never;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
/** pages: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }
}
/** scope: end */
