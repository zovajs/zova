/* eslint-disable */
/** service: begin */
export * from '../service/router.js';
export * from '../service/ssr.js';

import 'zova-module-a-bean';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'home-base:router': never;
'home-base:ssr': never;
    }

  
}
declare module 'zova-module-home-base' {
  
        export interface ServiceRouter {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface ServiceRouter {
          get $beanFullName(): 'home-base.service.router';
          get $onionName(): 'home-base:router';
          
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
import { ServiceRouter } from '../service/router.js';
import { ServiceSsr } from '../service/ssr.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-base.service.router': ServiceRouter;
'home-base.service.ssr': ServiceSsr;
  }
}
/** service: end */
/** controller: begin */
export * from '../component/page/controller.jsx';
export * from '../page/errorNotFound/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-base' {
  
        export interface ControllerPage {
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
import { ControllerPage } from '../component/page/controller.jsx';
import { ControllerPageErrorNotFound } from '../page/errorNotFound/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.controller.page': ControllerPage;
'home-base.controller.pageErrorNotFound': ControllerPageErrorNotFound;
  }
}
/** controller: end */
/** pages: begin */
export * from './page/errorNotFound.js';
export * from '../routes.js';
import { TypePagePathSchema } from 'zova-module-a-router';
import 'zova';
declare module 'zova-module-a-router' {
export interface IPagePathRecord {
  '/home/base//:catchAll(.*)*': TypePagePathSchema<undefined,undefined>;
}
export interface IPageNameRecord {
  
}
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {

};
declare module 'zova-module-home-base' {
   
}
/** pages: end */

/** components: begin */
export * from './component/page.js';
import { ZPage } from './component/page.js';
export const components = {
  'page': ZPage,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'home-base:page': ControllerPage;
}
export interface IZovaComponentRecord {
  'home-base:page': typeof ZPage;
}
}
/** components: end */
/** render: begin */
export * from '../component/page/render.jsx';
export * from '../page/errorNotFound/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-base' {
  
        export interface RenderPage {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface RenderPageErrorNotFound {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        } 
}
/** render: end */
/** render: begin */
import { RenderPage } from '../component/page/render.jsx';
import { RenderPageErrorNotFound } from '../page/errorNotFound/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.render.page': RenderPage;
'home-base.render.pageErrorNotFound': RenderPageErrorNotFound;
  }
}
/** render: end */
/** style: begin */
export * from '../component/page/style.js';
export * from '../page/errorNotFound/style.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-base' {
  
        export interface StylePage {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        }

        export interface StylePageErrorNotFound {
          /** @internal */
          get scope(): ScopeModuleHomeBase;
        } 
}
/** style: end */
/** style: begin */
import { StylePage } from '../component/page/style.js';
import { StylePageErrorNotFound } from '../page/errorNotFound/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.style.page': StylePage;
'home-base.style.pageErrorNotFound': StylePageErrorNotFound;
  }
}
/** style: end */
/** css: begin */
export * from '../bean/css.default.js';

import { IDecoratorCssOptions } from 'zova-module-a-style';
declare module 'zova-module-a-style' {
  
    export interface ICssRecord {
      'home-base:default': IDecoratorCssOptions;
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
          get $onionOptions(): IDecoratorCssOptions;
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

import { IDecoratorThemeOptions } from 'zova-module-a-style';
declare module 'zova-module-a-style' {
  
    export interface IThemeRecord {
      'home-base:default': IDecoratorThemeOptions;
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
          get $onionOptions(): IDecoratorThemeOptions;
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
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }
  
  

  

  
}
  
/** scope: end */
