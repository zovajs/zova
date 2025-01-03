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
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-todo.service.todo': ServiceTodo;
  }
}
/** service: end */
/** model: begin */
export * from '../bean/model.todo.js';

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
import { ModelTodo } from '../bean/model.todo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-todo.model.todo': ModelTodo;
  }
}
/** model: end */
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
