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
export * from '../component/layoutDefault/render.content.jsx';
export * from '../component/layoutDefault/render.header.jsx';
export * from '../component/layoutDefault/render.locale.jsx';
export * from '../component/layoutDefault/render.menu.jsx';
export * from '../component/layoutDefault/render.sidebar.jsx';
export * from '../component/layoutDefault/render.tabs.jsx';
export * from '../component/layoutDefault/render.theme.jsx';
export * from '../component/layoutDefault/render.jsx';
export * from '../component/layoutDefault/render.user.jsx';

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

  export interface RenderLayoutDefault {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }

  export interface RenderUser {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
/** render: end */
/** render: begin */
import { RenderContent } from '../component/layoutDefault/render.content.jsx';
import { RenderHeader } from '../component/layoutDefault/render.header.jsx';
import { RenderLocale } from '../component/layoutDefault/render.locale.jsx';
import { RenderMenu } from '../component/layoutDefault/render.menu.jsx';
import { RenderSidebar } from '../component/layoutDefault/render.sidebar.jsx';
import { RenderTabs } from '../component/layoutDefault/render.tabs.jsx';
import { RenderTheme } from '../component/layoutDefault/render.theme.jsx';
import { RenderLayoutDefault } from '../component/layoutDefault/render.jsx';
import { RenderUser } from '../component/layoutDefault/render.user.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.render.content': RenderContent;
    'home-layout.render.header': RenderHeader;
    'home-layout.render.locale': RenderLocale;
    'home-layout.render.menu': RenderMenu;
    'home-layout.render.sidebar': RenderSidebar;
    'home-layout.render.tabs': RenderTabs;
    'home-layout.render.theme': RenderTheme;
    'home-layout.render.layoutDefault': RenderLayoutDefault;
    'home-layout.render.user': RenderUser;
  }
}
/** render: end */
/** renders: begin */
declare module 'zova-module-home-layout' {
  export interface RenderContent extends StyleLayoutDefault {}
  export interface RenderHeader extends StyleLayoutDefault {}
  export interface RenderLocale extends StyleLayoutDefault {}
  export interface RenderMenu extends StyleLayoutDefault {}
  export interface RenderSidebar extends StyleLayoutDefault {}
  export interface RenderTabs extends StyleLayoutDefault {}
  export interface RenderTheme extends StyleLayoutDefault {}
  export interface RenderLayoutDefault extends StyleLayoutDefault {}
  export interface RenderUser extends StyleLayoutDefault {}
}
/** renders: end */
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
/** styles: begin */
declare module 'zova-module-home-layout' {
  export interface StyleLayoutDefault extends ControllerLayoutDefault {}
}
/** styles: end */
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
