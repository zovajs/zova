import { RequiredSome } from 'zova';
/** locale: end */
/** scope: begin */
import {
  BeanScopeBase,
  BeanScopeUtil,
  TypeLocaleBase,
  TypeModuleConfig,
  TypeModuleLocales,
} from 'zova';
/** api: end */
/** api: begin */

import { Scope } from 'zova-module-a-bean';

/** api: end */
/** api: begin */
import { ApiMenu } from '../api/menu.js';
/** controller: end */
/** controller: begin */
import { ControllerEssentialLink } from '../component/essentialLink/controller.jsx';
/** components: begin */
import {
  ControllerEssentialLinkEmits,
  ControllerEssentialLinkSlots,
} from '../component/essentialLink/controller.jsx';

import { ControllerLayoutDefault } from '../component/layoutDefault/controller.jsx';
import {
  ControllerLayoutDefaultEmits,
  ControllerLayoutDefaultSlots,
} from '../component/layoutDefault/controller.jsx';
/** render: end */
/** render: begin */
import { RenderContent } from '../component/layoutDefault/render.content.jsx';
import { RenderHeader } from '../component/layoutDefault/render.header.jsx';
import { RenderLayoutDefault } from '../component/layoutDefault/render.jsx';
/** controller: end */

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

import {
  ControllerLayoutEmptyEmits,
  ControllerLayoutEmptySlots,
} from '../component/layoutEmpty/controller.jsx';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
/** model: end */
/** model: begin */
import { ModelMenu } from '../model/menu.js';
import ZEssentialLink from './component/essentialLink.vue';
import ZLayoutDefault from './component/layoutDefault.vue';
import ZLayoutEmpty from './component/layoutEmpty.vue';
/** api: begin */
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
import 'zova';

import 'zova';

export * from '../api/menu.js';
declare module 'zova' {}
declare module 'zova-module-home-layout' {
  export interface ApiMenu {
    /** @internal */
    get scope(): ScopeModuleHomeLayout;
  }
}
export interface IModuleApi {
  menu: ApiMenu;
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.api.menu': ApiMenu;
  }
}
/** api: end */
/** openapi: begin */

/** model: end */
/** controller: begin */
export * from '../component/essentialLink/controller.jsx';
declare module 'zova' {}
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
export * from '../component/layoutDefault/controller.jsx';
/** components: end */
/** render: begin */
export * from '../component/layoutDefault/render.content.jsx';
export * from '../component/layoutDefault/render.header.jsx';
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
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.controller.essentialLink': ControllerEssentialLink;
    'home-layout.controller.layoutDefault': ControllerLayoutDefault;
    'home-layout.controller.layoutEmpty': ControllerLayoutEmpty;
  }
}
export * from '../component/layoutDefault/render.jsx';
export * from '../component/layoutDefault/render.locale.jsx';
export * from '../component/layoutDefault/render.menu.jsx';
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
}
declare module 'zova-module-home-layout' {
  export interface ControllerEssentialLinkProps {
    controllerRef?: (ref: ControllerEssentialLink) => void;
    slots?: ControllerEssentialLinkSlots;
  }

  export interface ControllerEssentialLink {
    $props: RequiredSome<
      ControllerEssentialLinkProps,
      keyof typeof ControllerEssentialLink.$propsDefault
    >;
    $emit: ControllerEssentialLinkEmits;
    $slots: ControllerEssentialLinkSlots;
  }
  export interface ControllerLayoutDefaultProps {
    controllerRef?: (ref: ControllerLayoutDefault) => void;
    slots?: ControllerLayoutDefaultSlots;
  }

  export interface ControllerLayoutDefault {
    $props: RequiredSome<
      ControllerLayoutDefaultProps,
      keyof typeof ControllerLayoutDefault.$propsDefault
    >;
    $emit: ControllerLayoutDefaultEmits;
    $slots: ControllerLayoutDefaultSlots;
  }
  export interface ControllerLayoutEmptyProps {
    controllerRef?: (ref: ControllerLayoutEmpty) => void;
    slots?: ControllerLayoutEmptySlots;
  }

  export interface ControllerLayoutEmpty {
    $props: RequiredSome<
      ControllerLayoutEmptyProps,
      keyof typeof ControllerLayoutEmpty.$propsDefault
    >;
    $emit: ControllerLayoutEmptyEmits;
    $slots: ControllerLayoutEmptySlots;
  }
}
export * from '../component/layoutDefault/render.sidebar.jsx';
export * from '../component/layoutDefault/render.tabs.jsx';
export * from '../component/layoutDefault/render.theme.jsx';
export * from '../component/layoutDefault/render.user.jsx';
/** renders: end */
/** style: begin */
export * from '../component/layoutDefault/style.js';
export * from '../component/layoutEmpty/controller.jsx';
/** styles: end */
/** config: begin */
export * from '../config/config.js';
/** openapi: end */
/** model: begin */
export * from '../model/menu.js';
export { default as ZEssentialLink } from './component/essentialLink.vue';
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
export { default as ZLayoutDefault } from './component/layoutDefault.vue';
declare module 'zova' {}
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
/** style: end */
/** styles: begin */
declare module 'zova-module-home-layout' {
  export interface StyleLayoutDefault extends ControllerLayoutDefault {}
}
export { default as ZLayoutEmpty } from './component/layoutEmpty.vue';

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
  api: IModuleApi;
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

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(
  key: K,
): `home-layout::${K}` {
  return `home-layout::${key}`;
}
/** scope: end */
