/** pages: begin */
export * as NSControllerPageErrorNotFound from '../page/errorNotFound/controller.js';

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {}
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
/** pages: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomePagesystem extends BeanScopeBase {}

export interface ScopeModuleHomePagesystem extends TypeModuleResource<any, any, any, any, any, any> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-pagesystem': ScopeModuleHomePagesystem;
  }
}
/** scope: end */