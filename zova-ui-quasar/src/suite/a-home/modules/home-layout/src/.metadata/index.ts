/* eslint-disable */
/** model: begin */
export * from '../model/layout.js';
export * from '../model/menu.js';
import { IModelOptionsLayout } from '../model/layout.js';
import { IModelOptionsMenu } from '../model/menu.js';
import 'zova-module-a-model';
declare module 'zova-module-a-model' {
  
    export interface IModelRecord {
      'home-layout:layout': IModelOptionsLayout;
'home-layout:menu': IModelOptionsMenu;
    }

  
}
declare module 'zova-module-home-layout' {
  
        export interface ModelLayout {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ModelLayout {
          get $beanFullName(): 'home-layout.model.layout';
          get $onionName(): 'home-layout:layout';
          get $onionOptions(): IModelOptionsLayout;
        }

        export interface ModelMenu {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ModelMenu {
          get $beanFullName(): 'home-layout.model.menu';
          get $onionName(): 'home-layout:menu';
          get $onionOptions(): IModelOptionsMenu;
        } 
}
/** model: end */
/** model: begin */
import { ModelLayout } from '../model/layout.js';
import { ModelMenu } from '../model/menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.model.layout': ModelLayout;
'home-layout.model.menu': ModelMenu;
  }
}
/** model: end */
/** api: begin */
export * from '../api/menu.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface ApiMenu {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ApiMenu {
          get $beanFullName(): 'home-layout.api.menu';
          get $onionName(): 'home-layout:menu';
          
        } 
}
/** api: end */
/** api: begin */
import { ApiMenu } from '../api/menu.js';
export interface IModuleApi {
  'menu': ApiMenu;
}
/** api: end */
/** api: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.api.menu': ApiMenu;
  }
}
/** api: end */
/** openapi: begin */

/** openapi: end */
/** controller: begin */
export * from '../component/essentialLink/controller.jsx';
export * from '../component/layoutEmpty/controller.jsx';
export * from '../component/layoutTabs/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface ControllerEssentialLink {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ControllerLayoutEmpty {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ControllerLayoutTabs {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerEssentialLink } from '../component/essentialLink/controller.jsx';
import { ControllerLayoutEmpty } from '../component/layoutEmpty/controller.jsx';
import { ControllerLayoutTabs } from '../component/layoutTabs/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.controller.essentialLink': ControllerEssentialLink;
'home-layout.controller.layoutEmpty': ControllerLayoutEmpty;
'home-layout.controller.layoutTabs': ControllerLayoutTabs;
  }
}
/** controller: end */

/** components: begin */
export * from './component/essentialLink.js';
import { ZEssentialLink } from './component/essentialLink.js';
export * from './component/layoutEmpty.js';
import { ZLayoutEmpty } from './component/layoutEmpty.js';
export * from './component/layoutTabs.js';
import { ZLayoutTabs } from './component/layoutTabs.js';
export const components = {
  'essentialLink': ZEssentialLink,
'layoutEmpty': ZLayoutEmpty,
'layoutTabs': ZLayoutTabs,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'home-layout:essentialLink': ControllerEssentialLink;
'home-layout:layoutEmpty': ControllerLayoutEmpty;
'home-layout:layoutTabs': ControllerLayoutTabs;
}
export interface IZovaComponentRecord {
  'home-layout:essentialLink': typeof ZEssentialLink;
'home-layout:layoutEmpty': typeof ZLayoutEmpty;
'home-layout:layoutTabs': typeof ZLayoutTabs;
}
}
/** components: end */
/** render: begin */
export * from '../component/layoutTabs/render.content.jsx';
export * from '../component/layoutTabs/render.header.jsx';
export * from '../component/layoutTabs/render.locale.jsx';
export * from '../component/layoutTabs/render.menu.jsx';
export * from '../component/layoutTabs/render.sidebar.jsx';
export * from '../component/layoutTabs/render.tabs.jsx';
export * from '../component/layoutTabs/render.theme.jsx';
export * from '../component/layoutTabs/render.jsx';
export * from '../component/layoutTabs/render.user.jsx';

import 'zova';
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

        export interface RenderLayoutTabs {
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
import { RenderContent } from '../component/layoutTabs/render.content.jsx';
import { RenderHeader } from '../component/layoutTabs/render.header.jsx';
import { RenderLocale } from '../component/layoutTabs/render.locale.jsx';
import { RenderMenu } from '../component/layoutTabs/render.menu.jsx';
import { RenderSidebar } from '../component/layoutTabs/render.sidebar.jsx';
import { RenderTabs } from '../component/layoutTabs/render.tabs.jsx';
import { RenderTheme } from '../component/layoutTabs/render.theme.jsx';
import { RenderLayoutTabs } from '../component/layoutTabs/render.jsx';
import { RenderUser } from '../component/layoutTabs/render.user.jsx';
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
'home-layout.render.layoutTabs': RenderLayoutTabs;
'home-layout.render.user': RenderUser;
  }
}
/** render: end */
/** style: begin */
export * from '../component/layoutTabs/style.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface StyleLayoutTabs {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        } 
}
/** style: end */
/** style: begin */
import { StyleLayoutTabs } from '../component/layoutTabs/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.style.layoutTabs': StyleLayoutTabs;
  }
}
/** style: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import { locales } from './locales.js';
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
api: IModuleApi;
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
