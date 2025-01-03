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
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.service.menu': ServiceMenu;
  }
}
/** service: end */
/** model: begin */
export * from '../bean/model.menu.js';

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
import { ModelMenu } from '../bean/model.menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.model.menu': ModelMenu;
  }
}
/** model: end */
import { RequiredSome } from 'zova';
/** components: begin */
export * from '../component/essentialLink/controller.js';
export * from '../component/layoutDefault/controller.js';
export * from '../component/layoutEmpty/controller.js';
import {
  ControllerEssentialLink,
  ControllerEssentialLinkEmits,
  ControllerEssentialLinkSlots,
} from '../component/essentialLink/controller.js';
import {
  ControllerLayoutDefault,
  ControllerLayoutDefaultEmits,
  ControllerLayoutDefaultSlots,
} from '../component/layoutDefault/controller.js';
import {
  ControllerLayoutEmpty,
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
