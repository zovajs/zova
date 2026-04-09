// eslint-disable
/** model: begin */
export * from '../model/menu.js';
import { IModelOptionsMenu } from '../model/menu.js';
import 'zova-module-a-model';
declare module 'zova-module-a-model' {
  
    export interface IModelRecord {
      'home-layout:menu': IModelOptionsMenu;
    }

  
}
declare module 'zova-module-home-layout' {
  
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
import { ModelMenu } from '../model/menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.model.menu': ModelMenu;
  }
}
/** model: end */
/** service: begin */
export * from '../service/ssr.js';

import 'zova-module-a-bean';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'home-layout:ssr': never;
    }

  
}
declare module 'zova-module-home-layout' {
  
        export interface ServiceSsr {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ServiceSsr {
          get $beanFullName(): 'home-layout.service.ssr';
          get $onionName(): 'home-layout:ssr';
          
        } 
}
/** service: end */
/** service: begin */
import { ServiceSsr } from '../service/ssr.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-layout.service.ssr': ServiceSsr;
  }
}
/** service: end */
/** controller: begin */
export * from '../component/itemLink/controller.jsx';
export * from '../component/layoutEmpty/controller.jsx';
export * from '../component/layoutTabs/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface ControllerItemLink {
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
import { ControllerItemLink } from '../component/itemLink/controller.jsx';
import { ControllerLayoutEmpty } from '../component/layoutEmpty/controller.jsx';
import { ControllerLayoutTabs } from '../component/layoutTabs/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.controller.itemLink': ControllerItemLink;
'home-layout.controller.layoutEmpty': ControllerLayoutEmpty;
'home-layout.controller.layoutTabs': ControllerLayoutTabs;
  }
}
/** controller: end */

/** components: begin */
export * from './component/itemLink.js';
import { ZItemLink } from './component/itemLink.js';
export * from './component/layoutEmpty.js';
import { ZLayoutEmpty } from './component/layoutEmpty.js';
export * from './component/layoutTabs.js';
import { ZLayoutTabs } from './component/layoutTabs.js';
export const components = {
  'itemLink': ZItemLink,
'layoutEmpty': ZLayoutEmpty,
'layoutTabs': ZLayoutTabs,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'home-layout:itemLink': ControllerItemLink;
'home-layout:layoutEmpty': ControllerLayoutEmpty;
'home-layout:layoutTabs': ControllerLayoutTabs;
}
export interface IZovaComponentRecord {
  'home-layout:itemLink': typeof ZItemLink;
'home-layout:layoutEmpty': typeof ZLayoutEmpty;
'home-layout:layoutTabs': typeof ZLayoutTabs;
}
}
/** components: end */
/** render: begin */
export * from '../component/layoutTabs/render.content.jsx';
export * from '../component/layoutTabs/render.menu.jsx';
export * from '../component/layoutTabs/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface RenderContent {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderMenu {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderLayoutTabs {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        } 
}
/** render: end */
/** render: begin */
import { RenderContent } from '../component/layoutTabs/render.content.jsx';
import { RenderMenu } from '../component/layoutTabs/render.menu.jsx';
import { RenderLayoutTabs } from '../component/layoutTabs/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.render.content': RenderContent;
'home-layout.render.menu': RenderMenu;
'home-layout.render.layoutTabs': RenderLayoutTabs;
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
