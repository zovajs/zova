/** service: begin */
export * from '../service/menu.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-layout' {
  export interface ServiceMenu {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
/** service: end */
/** service: begin */
import { ServiceMenu } from '../service/menu.js';
export interface IModuleService {
  menu: ServiceMenu;
}
/** service: end */
/** service: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.service.menu': ServiceMenu;
  }
}
/** service: end */
/** openapi: begin */

/** openapi: end */
/** model: begin */
export * from '../model/menu.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-layout' {
  export interface ModelMenu {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
/** model: end */
/** model: begin */
import { ModelMenu } from '../model/menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.model.menu': ModelMenu;
  }
}
/** model: end */
/** local: begin */
export * from '../component/layoutDefault/renderContent.jsx';
export * from '../component/layoutDefault/renderHeader.jsx';
export * from '../component/layoutDefault/renderLocale.jsx';
export * from '../component/layoutDefault/renderMenu.jsx';
export * from '../component/layoutDefault/renderSidebar.jsx';
export * from '../component/layoutDefault/renderTabs.jsx';
export * from '../component/layoutDefault/renderTheme.jsx';
export * from '../component/layoutDefault/renderUser.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-layout' {
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
}
/** local: end */
/** local: begin */
import { RenderContent } from '../component/layoutDefault/renderContent.jsx';
import { RenderHeader } from '../component/layoutDefault/renderHeader.jsx';
import { RenderLocale } from '../component/layoutDefault/renderLocale.jsx';
import { RenderMenu } from '../component/layoutDefault/renderMenu.jsx';
import { RenderSidebar } from '../component/layoutDefault/renderSidebar.jsx';
import { RenderTabs } from '../component/layoutDefault/renderTabs.jsx';
import { RenderTheme } from '../component/layoutDefault/renderTheme.jsx';
import { RenderUser } from '../component/layoutDefault/renderUser.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.local.renderContent': RenderContent;
    'home-layout.local.renderHeader': RenderHeader;
    'home-layout.local.renderLocale': RenderLocale;
    'home-layout.local.renderMenu': RenderMenu;
    'home-layout.local.renderSidebar': RenderSidebar;
    'home-layout.local.renderTabs': RenderTabs;
    'home-layout.local.renderTheme': RenderTheme;
    'home-layout.local.renderUser': RenderUser;
  }
}
/** local: end */
/** controller: begin */
export * from '../component/essentialLink/controller.jsx';
export * from '../component/layoutDefault/controller.jsx';
export * from '../component/layoutEmpty/controller.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-layout' {
  export interface ControllerEssentialLink {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface ControllerLayoutDefault {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface ControllerLayoutEmpty {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
/** controller: end */
/** controller: begin */
import { ControllerEssentialLink } from '../component/essentialLink/controller.jsx';
import { ControllerLayoutDefault } from '../component/layoutDefault/controller.jsx';
import { ControllerLayoutEmpty } from '../component/layoutEmpty/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.controller.essentialLink': ControllerEssentialLink;
    'home-layout.controller.layoutDefault': ControllerLayoutDefault;
    'home-layout.controller.layoutEmpty': ControllerLayoutEmpty;
  }
}
/** controller: end */
/** pages: begin */

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {}
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
declare module 'zova-module-home-layout' {}

/** pages: end */

import { RequiredSome } from 'zova';
/** components: begin */
import { ControllerEssentialLinkEmits, ControllerEssentialLinkSlots } from '../component/essentialLink/controller.jsx';
import { ControllerLayoutDefaultEmits, ControllerLayoutDefaultSlots } from '../component/layoutDefault/controller.jsx';
import { ControllerLayoutEmptyEmits, ControllerLayoutEmptySlots } from '../component/layoutEmpty/controller.jsx';
export { default as ZEssentialLink } from './component/essentialLink.vue';
import { default as ZEssentialLink } from './component/essentialLink.vue';
export { default as ZLayoutDefault } from './component/layoutDefault.vue';
import { default as ZLayoutDefault } from './component/layoutDefault.vue';
export { default as ZLayoutEmpty } from './component/layoutEmpty.vue';
import { default as ZLayoutEmpty } from './component/layoutEmpty.vue';
export const components = {
  essentialLink: ZEssentialLink,
  layoutDefault: ZLayoutDefault,
  layoutEmpty: ZLayoutEmpty,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-layout:essentialLink': ControllerEssentialLink;
    'home-layout:layoutDefault': ControllerLayoutDefault;
    'home-layout:layoutEmpty': ControllerLayoutEmpty;
  }
}
declare module 'zova-module-home-layout' {
  export interface ControllerEssentialLinkProps {
    controllerRef?: (ref: ControllerEssentialLink) => void;
    slots?: ControllerEssentialLinkSlots;
  }

  export interface ControllerEssentialLink {
    $props: RequiredSome<ControllerEssentialLinkProps, keyof typeof ControllerEssentialLink.$propsDefault>;
    $emit: ControllerEssentialLinkEmits;
    $slots: ControllerEssentialLinkSlots;
  }
  export interface ControllerLayoutDefaultProps {
    controllerRef?: (ref: ControllerLayoutDefault) => void;
    slots?: ControllerLayoutDefaultSlots;
  }

  export interface ControllerLayoutDefault {
    $props: RequiredSome<ControllerLayoutDefaultProps, keyof typeof ControllerLayoutDefault.$propsDefault>;
    $emit: ControllerLayoutDefaultEmits;
    $slots: ControllerLayoutDefaultSlots;
  }
  export interface ControllerLayoutEmptyProps {
    controllerRef?: (ref: ControllerLayoutEmpty) => void;
    slots?: ControllerLayoutEmptySlots;
  }

  export interface ControllerLayoutEmpty {
    $props: RequiredSome<ControllerLayoutEmptyProps, keyof typeof ControllerLayoutEmpty.$propsDefault>;
    $emit: ControllerLayoutEmptyEmits;
    $slots: ControllerLayoutEmptySlots;
  }
}
/** components: end */
/** render: begin */
export * from '../component/essentialLink/render.jsx';
export * from '../component/layoutDefault/render.jsx';
export * from '../component/layoutEmpty/render.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-layout' {
  export interface RenderEssentialLink {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderLayoutDefault {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderLayoutEmpty {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
/** render: end */
/** render: begin */
import { RenderEssentialLink } from '../component/essentialLink/render.jsx';
import { RenderLayoutDefault } from '../component/layoutDefault/render.jsx';
import { RenderLayoutEmpty } from '../component/layoutEmpty/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.render.essentialLink': RenderEssentialLink;
    'home-layout.render.layoutDefault': RenderLayoutDefault;
    'home-layout.render.layoutEmpty': RenderLayoutEmpty;
  }
}
/** render: end */
/** style: begin */
export * from '../component/layoutDefault/style.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-layout' {
  export interface StyleLayoutDefault {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
/** style: end */
/** style: begin */
import { StyleLayoutDefault } from '../component/layoutDefault/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.style.layoutDefault': StyleLayoutDefault;
  }
}
/** style: end */
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
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
}

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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-layout::${K}` {
  return `home-layout::${key}`;
}
/** scope: end */
