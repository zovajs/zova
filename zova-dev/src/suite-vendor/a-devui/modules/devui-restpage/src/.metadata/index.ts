/* eslint-disable */
/** controller: begin */
export * from '../component/restPage/controller.jsx';
export * from '../component/wrapperForm/controller.jsx';
export * from '../component/wrapperTable/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-restpage' {
  
        export interface ControllerRestPage {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        }

        export interface ControllerWrapperForm {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        }

        export interface ControllerWrapperTable {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerRestPage } from '../component/restPage/controller.jsx';
import { ControllerWrapperForm } from '../component/wrapperForm/controller.jsx';
import { ControllerWrapperTable } from '../component/wrapperTable/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.controller.restPage': ControllerRestPage;
'devui-restpage.controller.wrapperForm': ControllerWrapperForm;
'devui-restpage.controller.wrapperTable': ControllerWrapperTable;
  }
}
/** controller: end */

/** components: begin */
export * from './component/restPage.js';
import { ZRestPage } from './component/restPage.js';
export * from './component/wrapperForm.js';
import { ZWrapperForm } from './component/wrapperForm.js';
export * from './component/wrapperTable.js';
import { ZWrapperTable } from './component/wrapperTable.js';
export const components = {
  'restPage': ZRestPage,
'wrapperForm': ZWrapperForm,
'wrapperTable': ZWrapperTable,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'devui-restpage:restPage': ControllerRestPage;
'devui-restpage:wrapperForm': ControllerWrapperForm;
'devui-restpage:wrapperTable': ControllerWrapperTable;
}
export interface IZovaComponentRecord {
  'devui-restpage:restPage': typeof ZRestPage;
'devui-restpage:wrapperForm': typeof ZWrapperForm;
'devui-restpage:wrapperTable': typeof ZWrapperTable;
}
}
/** components: end */
/** render: begin */
export * from '../component/restPage/render.jsx';
export * from '../component/wrapperForm/render.jsx';
export * from '../component/wrapperTable/render.actions.jsx';
export * from '../component/wrapperTable/render.create.jsx';
export * from '../component/wrapperTable/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-restpage' {
  
        export interface RenderRestPage {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        }

        export interface RenderWrapperForm {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        }

        export interface RenderActions {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        }

        export interface RenderCreate {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        }

        export interface RenderWrapperTable {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        } 
}
/** render: end */
/** render: begin */
import { RenderRestPage } from '../component/restPage/render.jsx';
import { RenderWrapperForm } from '../component/wrapperForm/render.jsx';
import { RenderActions } from '../component/wrapperTable/render.actions.jsx';
import { RenderCreate } from '../component/wrapperTable/render.create.jsx';
import { RenderWrapperTable } from '../component/wrapperTable/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.render.restPage': RenderRestPage;
'devui-restpage.render.wrapperForm': RenderWrapperForm;
'devui-restpage.render.actions': RenderActions;
'devui-restpage.render.create': RenderCreate;
'devui-restpage.render.wrapperTable': RenderWrapperTable;
  }
}
/** render: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiRestpage extends BeanScopeBase {}

export interface ScopeModuleDevuiRestpage {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-restpage': ScopeModuleDevuiRestpage;
  }
  
  

  export interface IBeanScopeLocale {
    'devui-restpage': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `devui-restpage::${K}` {
  return `devui-restpage::${key}`;
}  
/** scope: end */
