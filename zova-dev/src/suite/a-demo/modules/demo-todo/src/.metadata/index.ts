/** service: begin */
export * from '../service/todo.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-demo-todo' {
  export interface ServiceTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
/** service: end */
/** service: begin */
import { ServiceTodo } from '../service/todo.js';
export interface IModuleService {
  todo: ServiceTodo;
}
/** service: end */
/** service: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-todo.service.todo': ServiceTodo;
  }
}
/** service: end */
/** openapi: begin */

/** openapi: end */
/** model: begin */
export * from '../model/todo.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-demo-todo' {
  export interface ModelTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
/** model: end */
/** model: begin */
import { ModelTodo } from '../model/todo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-todo.model.todo': ModelTodo;
  }
}
/** model: end */
/** local: begin */
export * from '../page/item/controller.js';
export * from '../page/item/render.jsx';
export * from '../page/item/style.js';
export * from '../page/todo/controller.js';
export * from '../page/todo/render.jsx';
export * from '../page/todo/style.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-demo-todo' {
  export interface ControllerPageItem {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

  export interface RenderItem {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

  export interface StyleItem {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

  export interface ControllerPageTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

  export interface RenderTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

  export interface StyleTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
/** local: end */
/** local: begin */
import { ControllerPageItem } from '../page/item/controller.js';
import { RenderItem } from '../page/item/render.jsx';
import { StyleItem } from '../page/item/style.js';
import { ControllerPageTodo } from '../page/todo/controller.js';
import { RenderTodo } from '../page/todo/render.jsx';
import { StyleTodo } from '../page/todo/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-todo.local.controllerPageItem': ControllerPageItem;
    'demo-todo.local.renderItem': RenderItem;
    'demo-todo.local.styleItem': StyleItem;
    'demo-todo.local.controllerPageTodo': ControllerPageTodo;
    'demo-todo.local.renderTodo': RenderTodo;
    'demo-todo.local.styleTodo': StyleTodo;
  }
}
/** local: end */
/** pages: begin */
export * from '../page/item/controller.js';
export * from '../page/todo/controller.js';
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/todo/todo': ControllerPageTodo.QueryInput;
  }
  export interface IPageNameRecord {
    'demo-todo:item': TypePageParamsQuery<ControllerPageItem.QueryInput, ControllerPageItem.ParamsInput>;
  }
}
export const pagePathSchemas = {
  '/demo/todo/todo': {
    query: ControllerPageTodo.querySchema,
  },
};
export const pageNameSchemas = {
  'demo-todo:item': {
    params: ControllerPageItem.paramsSchema,
    query: ControllerPageItem.querySchema,
  },
};
/** pages: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDemoTodo extends BeanScopeBase {}

export interface ScopeModuleDemoTodo {
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-todo': ScopeModuleDemoTodo;
  }
}

/** scope: end */
