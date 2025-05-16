import type { BeanScopeUtil } from 'zova';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeLocaleBase, TypeModuleConfig, TypeModuleLocales } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** controller: begin */
import { ControllerEssentialLink } from '../component/essentialLink/controller.jsx';
import { ControllerLayoutDefault } from '../component/layoutDefault/controller.jsx';
/** render: end */
/** render: begin */
import { RenderContent } from '../component/layoutDefault/render.content.jsx';
import { RenderHeader } from '../component/layoutDefault/render.header.jsx';
import { RenderLayoutDefault } from '../component/layoutDefault/render.jsx';
import { RenderLocale } from '../component/layoutDefault/render.locale.jsx';

import { RenderMenu } from '../component/layoutDefault/render.menu.jsx';
import { RenderSidebar } from '../component/layoutDefault/render.sidebar.jsx';
import { RenderTabs } from '../component/layoutDefault/render.tabs.jsx';
import { RenderTheme } from '../component/layoutDefault/render.theme.jsx';
import { RenderUser } from '../component/layoutDefault/render.user.jsx';
/** style: end */
/** style: begin */
import { StyleLayoutDefault } from '../component/layoutDefault/style.js';
import { ControllerLayoutEmpty } from '../component/layoutEmpty/controller.jsx';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
/** model: end */
/** model: begin */
import { ModelMenu } from '../model/menu.js';

import { ZEssentialLink } from './component/essentialLink.js';
import { ZLayoutDefault } from './component/layoutDefault.js';
import { ZLayoutEmpty } from './component/layoutEmpty.js';

/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/essentialLink/controller.jsx';
export * from '../component/layoutDefault/controller.jsx';
/** components: end */
/** render: begin */
export * from '../component/layoutDefault/render.content.jsx';
declare module 'zova' {

}
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
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.controller.essentialLink': ControllerEssentialLink;
    'home-layout.controller.layoutDefault': ControllerLayoutDefault;
    'home-layout.controller.layoutEmpty': ControllerLayoutEmpty;
  }
}
/** controller: end */

export * from '../component/layoutDefault/render.header.jsx';
export * from '../component/layoutDefault/render.jsx';
export * from '../component/layoutDefault/render.locale.jsx';
export const components = {
  essentialLink: ZEssentialLink,
  layoutDefault: ZLayoutDefault,
  layoutEmpty: ZLayoutEmpty,
};
declare module 'zova' {
  export interface IComponentRecord {
    'home-layout:essentialLink': ControllerEssentialLink;
    'home-layout:layoutDefault': ControllerLayoutDefault;
    'home-layout:layoutEmpty': ControllerLayoutEmpty;
  }
  export interface IZovaComponentRecord {
    'home-layout:essentialLink': typeof ZEssentialLink;
    'home-layout:layoutDefault': typeof ZLayoutDefault;
    'home-layout:layoutEmpty': typeof ZLayoutEmpty;
  }
}
export * from '../component/layoutDefault/render.menu.jsx';
export * from '../component/layoutDefault/render.sidebar.jsx';
export * from '../component/layoutDefault/render.tabs.jsx';
export * from '../component/layoutDefault/render.theme.jsx';
export * from '../component/layoutDefault/render.user.jsx';
/** render: end */
/** style: begin */
export * from '../component/layoutDefault/style.js';
export * from '../component/layoutEmpty/controller.jsx';
/** model: end */
/** config: begin */
export * from '../config/config.js';
/** style: end */
/** model: begin */
export * from '../model/menu.js';
declare module 'zova' {

}
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
/** components: begin */
export * from './component/essentialLink.js';
declare module 'zova' {

}
declare module 'zova-module-home-layout' {

  export interface StyleLayoutDefault {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.style.layoutDefault': StyleLayoutDefault;
  }
}
export * from './component/layoutDefault.js';
declare module 'zova' {

}
declare module 'zova-module-home-layout' {

  export interface ModelMenu {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.model.menu': ModelMenu;
  }
}
export * from './component/layoutEmpty.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

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
