/** beans: begin */
export * from '../bean/model.menu.js';
import { ModelMenu } from '../bean/model.menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-layout.model.menu': ModelMenu;
  }
}
/** beans: end */
/** components: begin */
export { ControllerEssentialLink } from '../component/essentialLink/controller.js';
export * as NSControllerEssentialLink from '../component/essentialLink/controller.js';
export { ControllerLayoutDefault } from '../component/layoutDefault/controller.js';
export * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
export { ControllerLayoutEmpty } from '../component/layoutEmpty/controller.js';
export * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
import * as NSControllerEssentialLink from '../component/essentialLink/controller.js';
import * as NSControllerLayoutDefault from '../component/layoutDefault/controller.js';
import * as NSControllerLayoutEmpty from '../component/layoutEmpty/controller.js';
export { default as ZEssentialLink } from '../component/essentialLink/index.vue';
import ZEssentialLink from '../component/essentialLink/index.vue';
export { default as ZLayoutDefault } from '../component/layoutDefault/index.vue';
import ZLayoutDefault from '../component/layoutDefault/index.vue';
export { default as ZLayoutEmpty } from '../component/layoutEmpty/index.vue';
import ZLayoutEmpty from '../component/layoutEmpty/index.vue';
export const components = {
  essentialLink: ZEssentialLink,
  layoutDefault: ZLayoutDefault,
  layoutEmpty: ZLayoutEmpty,
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
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** service: begin */
export * from '../service/menu.js';
import { ServiceMenu } from '../service/menu.js';
export interface IModuleService {
  menu: ServiceMenu;
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout
  extends TypeModuleResource<typeof config, never, (typeof locales)[TypeLocaleBase], never, IModuleService> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-layout': ScopeModuleHomeLayout;
  }

  export interface IBeanScopeConfig {
    'home-layout': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-layout': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
/** scope module: begin */
export * from '../bean/model.menu.js';
export * from '../component/essentialLink/controller.js';
export * from '../component/essentialLink/render.jsx';
export * from '../component/layoutDefault/controller.js';
export * from '../component/layoutDefault/render.jsx';
export * from '../component/layoutDefault/renderContent.jsx';
export * from '../component/layoutDefault/renderHeader.jsx';
export * from '../component/layoutDefault/renderLocale.jsx';
export * from '../component/layoutDefault/renderMenu.jsx';
export * from '../component/layoutDefault/renderSidebar.jsx';
export * from '../component/layoutDefault/renderTabs.jsx';
export * from '../component/layoutDefault/renderTheme.jsx';
export * from '../component/layoutDefault/renderUser.jsx';
export * from '../component/layoutDefault/style.js';
export * from '../component/layoutEmpty/controller.js';
export * from '../component/layoutEmpty/render.jsx';
export * from '../service/menu.js';
declare module 'zova-module-home-layout' {
  export interface ModelMenu {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface ControllerEssentialLink {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderEssentialLink {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface ControllerLayoutDefault {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderLayoutDefault {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderContent {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderHeader {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderLocale {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderMenu {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderSidebar {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderTabs {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderTheme {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderUser {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface StyleLayoutDefault {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface ControllerLayoutEmpty {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderLayoutEmpty {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface ServiceMenu {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
/** scope module: end */
