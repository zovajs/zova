/** service: begin */
import service_book from '../service/book.js';
export const services = {
  book: service_book,
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
