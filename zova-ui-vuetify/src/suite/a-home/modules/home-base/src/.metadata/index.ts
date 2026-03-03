/* eslint-disable */
/** service: begin */
export * from '../service/routerGuards.js';
export * from '../service/ssr.js';

import 'zova-module-a-bean';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'home-base:routerGuards': never;
'home-base:ssr': never;
    }

  
}
declare module 'zova-module-home-base' {
  
        export interface ServiceRouterGuards {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface ServiceRouterGuards {
          get $beanFullName(): 'home-base.service.routerGuards';
          get $onionName(): 'home-base:routerGuards';
          
        }

        export interface ServiceSsr {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface ServiceSsr {
          get $beanFullName(): 'home-base.service.ssr';
          get $onionName(): 'home-base:ssr';
          
        } 
}
/** service: end */
/** service: begin */
import { ServiceRouterGuards } from '../service/routerGuards.js';
import { ServiceSsr } from '../service/ssr.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-base.service.routerGuards': ServiceRouterGuards;
'home-base.service.ssr': ServiceSsr;
  }
}
/** service: end */
/** controller: begin */
export * from '../component/itemLink/controller.jsx';
export * from '../component/page/controller.jsx';
export * from '../page/errorExpired/controller.jsx';
export * from '../page/errorNotFound/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-base' {
  
        export interface ControllerItemLink {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface ControllerPage {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface ControllerPageErrorExpired {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface ControllerPageErrorNotFound {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerItemLink } from '../component/itemLink/controller.jsx';
import { ControllerPage } from '../component/page/controller.jsx';
import { ControllerPageErrorExpired } from '../page/errorExpired/controller.jsx';
import { ControllerPageErrorNotFound } from '../page/errorNotFound/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.controller.itemLink': ControllerItemLink;
'home-base.controller.page': ControllerPage;
'home-base.controller.pageErrorExpired': ControllerPageErrorExpired;
'home-base.controller.pageErrorNotFound': ControllerPageErrorNotFound;
  }
}
/** controller: end */
/** pages: begin */
export * from './page/errorExpired.js';
import { NSControllerPageErrorExpired } from './page/errorExpired.js';
export * from './page/errorNotFound.js';
export * from '../routes.js';
import { TypePagePathSchema } from 'zova-module-a-router';
import 'zova';
declare module 'zova-module-a-router' {
export interface IPagePathRecord {
  '/home/base/errorExpired': TypePagePathSchema<undefined,NSControllerPageErrorExpired.QueryInput>;
'/home/base//:catchAll(.*)*': TypePagePathSchema<undefined,undefined>;
}
export interface IPageNameRecord {
  
}
}
export const pagePathSchemas = {
'/home/base/errorExpired': {
          query: NSControllerPageErrorExpired.querySchema,
        },
};
export const pageNameSchemas = {

};
declare module 'zova-module-home-base' {
  export interface ControllerPageErrorExpired {
        $query: NSControllerPageErrorExpired.QueryOutput;
      } 
}
/** pages: end */

/** components: begin */
export * from './component/itemLink.js';
import { ZItemLink } from './component/itemLink.js';
export * from './component/page.js';
import { ZPage } from './component/page.js';
export const components = {
  'itemLink': ZItemLink,
'page': ZPage,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'home-base:itemLink': ControllerItemLink;
'home-base:page': ControllerPage;
}
export interface IZovaComponentRecord {
  'home-base:itemLink': typeof ZItemLink;
'home-base:page': typeof ZPage;
}
}
/** components: end */
/** css: begin */
export * from '../bean/css.default.js';
import { ICssOptionsDefault } from '../bean/css.default.js';
import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  
    export interface ICssRecord {
      'home-base:default': ICssOptionsDefault;
    }

  
}
declare module 'zova-module-home-base' {
  
        export interface CssDefault {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface CssDefault {
          get $beanFullName(): 'home-base.css.default';
          get $onionName(): 'home-base:default';
          get $onionOptions(): ICssOptionsDefault;
        } 
}
/** css: end */
/** css: begin */
import { CssDefault } from '../bean/css.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.css.default': CssDefault;
  }
}
/** css: end */
/** theme: begin */
export * from '../bean/theme.default.js';
import { IThemeOptionsDefault } from '../bean/theme.default.js';
import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  
    export interface IThemeRecord {
      'home-base:default': IThemeOptionsDefault;
    }

  
}
declare module 'zova-module-home-base' {
  
        export interface ThemeDefault {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface ThemeDefault {
          get $beanFullName(): 'home-base.theme.default';
          get $onionName(): 'home-base:default';
          get $onionOptions(): IThemeOptionsDefault;
        } 
}
/** theme: end */
/** theme: begin */
import { ThemeDefault } from '../bean/theme.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.theme.default': ThemeDefault;
  }
}
/** theme: end */
/** locale: begin */
import { locales } from './locales.js';
/** locale: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** monkeySys: begin */
export * from '../monkeySys.js';
/** monkeySys: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }
  
  

  export interface IBeanScopeLocale {
    'home-base': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-base::${K}` {
  return `home-base::${key}`;
}  
/** scope: end */
