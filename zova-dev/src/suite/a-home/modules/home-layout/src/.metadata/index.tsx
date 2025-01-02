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
import { RequiredSome } from 'zova';
/** components: begin */
export * from '../component/essentialLink/controller.js';
export * from '../component/layoutDefault/controller.js';
export * from '../component/layoutEmpty/controller.js';
import {
  ControllerEssentialLink,
  ControllerEssentialLinkProps,
  ControllerEssentialLinkEmits,
  ControllerEssentialLinkSlots,
} from '../component/essentialLink/controller.js';
import {
  ControllerLayoutDefault,
  ControllerLayoutDefaultProps,
  ControllerLayoutDefaultEmits,
  ControllerLayoutDefaultSlots,
} from '../component/layoutDefault/controller.js';
import {
  ControllerLayoutEmpty,
  ControllerLayoutEmptyProps,
  ControllerLayoutEmptyEmits,
  ControllerLayoutEmptySlots,
} from '../component/layoutEmpty/controller.js';
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
export namespace NSControllerEssentialLink {
  export type PropsInput = ControllerEssentialLinkProps;
}
export namespace NSControllerLayoutDefault {
  export type PropsInput = ControllerLayoutDefaultProps;
}
export namespace NSControllerLayoutEmpty {
  export type PropsInput = ControllerLayoutEmptyProps;
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
