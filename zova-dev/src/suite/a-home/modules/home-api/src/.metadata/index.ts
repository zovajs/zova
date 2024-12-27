/** beans: begin */
export * from '../bean/bean.api.js';
import { BeanApi } from '../bean/bean.api.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-api.bean.api': BeanApi;
  }
}
/** beans: end */
/** service: begin */
import { ServiceBook } from '../service/book.js';
export interface IModuleService {
  book: ServiceBook;
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeApi extends BeanScopeBase {}

export interface ScopeModuleHomeApi extends TypeModuleResource<never, never, never, never, IModuleService> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }
}
/** scope: end */
