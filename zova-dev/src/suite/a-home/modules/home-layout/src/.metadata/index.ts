/* eslint-disable */
/** controller: begin */
export * from '../component/essentialLink/controller.jsx';
export * from '../component/layoutDefault/controller.jsx';
export * from '../component/layoutEmpty/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface ControllerEssentialLink {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ControllerEssentialLink {
          get $beanFullName(): 'home-layout.controller.essentialLink';
          get $onionName(): 'home-layout:essentialLink';
        }

        export interface ControllerLayoutDefault {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ControllerLayoutDefault {
          get $beanFullName(): 'home-layout.controller.layoutDefault';
          get $onionName(): 'home-layout:layoutDefault';
        }

        export interface ControllerLayoutEmpty {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ControllerLayoutEmpty {
          get $beanFullName(): 'home-layout.controller.layoutEmpty';
          get $onionName(): 'home-layout:layoutEmpty';
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

/** components: begin */
export * from './component/essentialLink.js';
import { ZEssentialLink } from './component/essentialLink.js';
export * from './component/layoutDefault.js';
import { ZLayoutDefault } from './component/layoutDefault.js';
export * from './component/layoutEmpty.js';
import { ZLayoutEmpty } from './component/layoutEmpty.js';
export const components = {
  'essentialLink': ZEssentialLink,
'layoutDefault': ZLayoutDefault,
'layoutEmpty': ZLayoutEmpty,
};
import 'zova';
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
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface RenderContent {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderContent {
          get $beanFullName(): 'home-layout.render.content';
          get $onionName(): 'home-layout:content';
        }

        export interface RenderHeader {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderHeader {
          get $beanFullName(): 'home-layout.render.header';
          get $onionName(): 'home-layout:header';
        }

        export interface RenderLocale {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderLocale {
          get $beanFullName(): 'home-layout.render.locale';
          get $onionName(): 'home-layout:locale';
        }

        export interface RenderMenu {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderMenu {
          get $beanFullName(): 'home-layout.render.menu';
          get $onionName(): 'home-layout:menu';
        }

        export interface RenderSidebar {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderSidebar {
          get $beanFullName(): 'home-layout.render.sidebar';
          get $onionName(): 'home-layout:sidebar';
        }

        export interface RenderTabs {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderTabs {
          get $beanFullName(): 'home-layout.render.tabs';
          get $onionName(): 'home-layout:tabs';
        }

        export interface RenderTheme {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderTheme {
          get $beanFullName(): 'home-layout.render.theme';
          get $onionName(): 'home-layout:theme';
        }

        export interface RenderLayoutDefault {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderLayoutDefault {
          get $beanFullName(): 'home-layout.render.layoutDefault';
          get $onionName(): 'home-layout:layoutDefault';
        }

        export interface RenderUser {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderUser {
          get $beanFullName(): 'home-layout.render.user';
          get $onionName(): 'home-layout:user';
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
/** style: begin */
export * from '../component/layoutDefault/style.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface StyleLayoutDefault {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface StyleLayoutDefault {
          get $beanFullName(): 'home-layout.style.layoutDefault';
          get $onionName(): 'home-layout:layoutDefault';
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
/** model: begin */
export * from '../model/menu.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface ModelMenu {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ModelMenu {
          get $beanFullName(): 'home-layout.model.menu';
          get $onionName(): 'home-layout:menu';
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
import { BeanScopeBase, type BeanScopeUtil, TypeModuleConfig, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
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
