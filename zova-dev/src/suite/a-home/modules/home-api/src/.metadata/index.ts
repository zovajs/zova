/** beans: begin */
export * from '../bean/bean.api.js';
export * from '../bean/bean.serviceBase.js';
import { BeanApi } from '../bean/bean.api.js';
import { BeanServiceBase } from '../bean/bean.serviceBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-api.bean.api': BeanApi;
    'home-api.bean.serviceBase': BeanServiceBase;
  }
}
/** beans: end */
/** service: begin */
import ServiceBook from '../service/book.js';
import ServiceHome from '../service/home.js';
import ServiceOnion from '../service/onion.js';
export const services = {
  book: ServiceBook,
  home: ServiceHome,
  onion: ServiceOnion,
};
/** service: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeApi extends BeanScopeBase {}

export interface ScopeModuleHomeApi extends TypeModuleResource<never, never, never, never, typeof services> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }
}
/** scope: end */
