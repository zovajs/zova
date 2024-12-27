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
export * as NSControllerPageItem from '../page/item/controller.js';
export * as NSControllerPageTodo from '../page/todo/controller.js';
import * as NSControllerPageItem from '../page/item/controller.js';
import * as NSControllerPageTodo from '../page/todo/controller.js';
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/todo/todo': NSControllerPageTodo.QueryInput;
  }
  export interface IPageNameRecord {
    'demo-todo:item': TypePageParamsQuery<NSControllerPageItem.QueryInput, NSControllerPageItem.ParamsInput>;
  }
}
export const pagePathSchemas = {
  '/demo/todo/todo': {
    query: NSControllerPageTodo.QuerySchema,
  },
};
export const pageNameSchemas = {
  'demo-todo:item': {
    params: NSControllerPageItem.ParamsSchema,
    query: NSControllerPageItem.QuerySchema,
  },
};
/** pages: end */
/** service: begin */
import { ServiceTodo } from '../service/todo.js';
export interface IModuleService {
  todo: ServiceTodo;
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleDemoTodo extends BeanScopeBase {}

export interface ScopeModuleDemoTodo extends TypeModuleResource<never, never, never, never, IModuleService> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-todo': ScopeModuleDemoTodo;
  }
}
/** scope: end */
