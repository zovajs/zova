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
