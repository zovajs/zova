/** beans: begin */
export * from '../bean/model.todo.js';
import { ModelTodo } from '../bean/model.todo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-todo.model.todo': ModelTodo;
  }
}
/** beans: end */
/** pages: begin */
export * from '../page/item/controller.js';
export * from '../page/todo/controller.js';
import { ControllerPageItem } from '../page/item/controller.js';
import { ControllerPageTodo } from '../page/todo/controller.js';
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
/** service: begin */
export * from '../service/todo.js';
import { ServiceTodo } from '../service/todo.js';
export interface IModuleService {
  todo: ServiceTodo;
}
/** service: end */
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
/** scope module: begin */
export * from '../bean/model.todo.js';
export * from '../page/item/controller.js';
export * from '../page/item/render.jsx';
export * from '../page/item/style.js';
export * from '../page/todo/controller.js';
export * from '../page/todo/render.jsx';
export * from '../page/todo/style.js';
export * from '../service/todo.js';
declare module 'zova-module-demo-todo' {
  export interface ModelTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

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

  export interface ServiceTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
/** scope module: end */
