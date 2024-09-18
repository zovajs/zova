/** beans: begin */
export * from '../bean/model.layout.js';
export * from '../bean/model.menu.js';
import { ModelLayout } from '../bean/model.layout.js';
import { ModelMenu } from '../bean/model.menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-layout.model.layout': ModelLayout;
    'home-layout.model.menu': ModelMenu;
  }
}
/** beans: end */
/** components: begin */
export * as NSControllerEssentialLink from '../component/essentialLink/controller.js';
export * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
export * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
import * as NSControllerEssentialLink from '../component/essentialLink/controller.js';
import * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
import * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
import component_essentialLink from '../component/essentialLink/index.vue';
import component_layoutDefault from '../component/layoutDefault/index.vue';
import component_layoutEmpty from '../component/layoutEmpty/index.vue';
export const components = {
  essentialLink: component_essentialLink,
  layoutDefault: component_layoutDefault,
  layoutEmpty: component_layoutEmpty,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-layout:essentialLink': NSControllerEssentialLink.ControllerEssentialLink;
    'home-layout:layoutDefault': NSControllerLayoutDefault.ControllerLayoutDefault;
    'home-layout:layoutEmpty': NSControllerLayoutEmpty.ControllerLayoutEmpty;
  }
}
/** components: end */
/** service: begin */
import service_menu from '../service/menu.js';
export const services = {
  menu: service_menu,
};
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout
  extends TypeModuleResource<typeof components, any, any, any, any, typeof services> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-layout': ScopeModuleHomeLayout;
  }
}
/** scope: end */