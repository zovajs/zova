import { TypePageParamsQuery } from 'zova';
/** model: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
/** api: end */
/** api: begin */

import { Scope } from 'zova-module-a-bean';

/** api: end */
/** api: begin */
import { ApiTodo } from '../api/todo.js';
/** model: end */
/** model: begin */
import { ModelTodo } from '../model/todo.js';
/** controller: end */
/** controller: begin */
import { ControllerPageItem } from '../page/item/controller.jsx';
import { ControllerPageTodo } from '../page/todo/controller.jsx';
import { NSControllerPageItem } from './page/item.js';
/** api: begin */
import 'zova';
import 'zova';

import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../api/todo.js';
declare module 'zova' {

}
declare module 'zova-module-demo-todo' {

  export interface ApiTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
export interface IModuleApi {
  todo: ApiTodo;
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-todo.api.todo': ApiTodo;
  }
}
/** api: end */
/** openapi: begin */

/** model: begin */
export * from '../model/todo.js';
/** openapi: end */
/** controller: begin */
export * from '../page/item/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-demo-todo' {

  export interface ControllerPageItem {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

  export interface ControllerPageTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-todo.controller.pageItem': ControllerPageItem;
    'demo-todo.controller.pageTodo': ControllerPageTodo;
  }
}
export * from '../page/todo/controller.jsx';
export * from '../routes.js';
/** controller: end */
/** pages: begin */
export * from './page/item.js';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/todo/todo': undefined;
  }
  export interface IPageNameRecord {
    'demo-todo:item': TypePageParamsQuery<NSControllerPageItem.QueryInput, NSControllerPageItem.ParamsInput>;
  }
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {
  'demo-todo:item': {
    params: NSControllerPageItem.paramsSchema,
    query: NSControllerPageItem.querySchema,
  },
};
declare module 'zova-module-demo-todo' {
  export interface ControllerPageItem {
    $params: NSControllerPageItem.ParamsOutput;
    $query: NSControllerPageItem.QueryOutput;
  }
}
/** pages: end */

export * from './page/todo.js';
declare module 'zova' {

}
declare module 'zova-module-demo-todo' {

  export interface ModelTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-todo.model.todo': ModelTodo;
  }
}

@Scope()
export class ScopeModuleDemoTodo extends BeanScopeBase {}

export interface ScopeModuleDemoTodo {
  util: BeanScopeUtil;
  api: IModuleApi;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-todo': ScopeModuleDemoTodo;
  }

}

/** scope: end */
