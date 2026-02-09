/* eslint-disable */
/** model: begin */
export * from '../model/layout.js';
export * from '../model/menu.js';

import { IDecoratorModelOptions } from 'zova-module-a-model';
declare module 'zova-module-a-model' {
  
    export interface IModelRecord {
      'home-layout:layout': IDecoratorModelOptions;
'home-layout:menu': IDecoratorModelOptions;
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
          get $onionOptions(): IDecoratorModelOptions;
        }

        export interface ModelMenu {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface ModelMenu {
          get $beanFullName(): 'home-layout.model.menu';
          get $onionName(): 'home-layout:menu';
          get $onionOptions(): IDecoratorModelOptions;
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
/** controller: begin */
export * from '../component/itemLink/controller.jsx';
export * from '../component/layoutDefault/controller.jsx';
export * from '../component/layoutEmpty/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface ControllerItemLink {
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
/** controller: end */
/** controller: begin */
import { ControllerItemLink } from '../component/itemLink/controller.jsx';
import { ControllerLayoutDefault } from '../component/layoutDefault/controller.jsx';
import { ControllerLayoutEmpty } from '../component/layoutEmpty/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.controller.itemLink': ControllerItemLink;
'home-layout.controller.layoutDefault': ControllerLayoutDefault;
'home-layout.controller.layoutEmpty': ControllerLayoutEmpty;
  }
}
/** controller: end */

/** components: begin */
export * from './component/itemLink.js';
import { ZItemLink } from './component/itemLink.js';
export * from './component/layoutDefault.js';
import { ZLayoutDefault } from './component/layoutDefault.js';
export * from './component/layoutEmpty.js';
import { ZLayoutEmpty } from './component/layoutEmpty.js';
export const components = {
  'itemLink': ZItemLink,
'layoutDefault': ZLayoutDefault,
'layoutEmpty': ZLayoutEmpty,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'home-layout:itemLink': ControllerItemLink;
'home-layout:layoutDefault': ControllerLayoutDefault;
'home-layout:layoutEmpty': ControllerLayoutEmpty;
}
export interface IZovaComponentRecord {
  'home-layout:itemLink': typeof ZItemLink;
'home-layout:layoutDefault': typeof ZLayoutDefault;
'home-layout:layoutEmpty': typeof ZLayoutEmpty;
}
}
/** components: end */
/** render: begin */
export * from '../component/layoutDefault/render.jsx';
export * from '../component/layoutEmpty/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-layout' {
  
        export interface RenderLayoutDefault {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        }

        export interface RenderLayoutEmpty {
          /** @internal */
          get scope(): ScopeModuleHomeLayout;
        } 
}
/** render: end */
/** render: begin */
import { RenderLayoutDefault } from '../component/layoutDefault/render.jsx';
import { RenderLayoutEmpty } from '../component/layoutEmpty/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-layout.render.layoutDefault': RenderLayoutDefault;
'home-layout.render.layoutEmpty': RenderLayoutEmpty;
  }
}
/** render: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeLayout extends BeanScopeBase {}

export interface ScopeModuleHomeLayout {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-layout': ScopeModuleHomeLayout;
  }
  
  

  

  
}
  
/** scope: end */
