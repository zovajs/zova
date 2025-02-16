import type { z } from 'zod';
import type { TypePageParamsQuery } from 'zova';
/** api: end */
/** api: begin */

/** scope: begin */
import type { BeanScopeUtil } from 'zova';
/** api: end */
/** api: begin */
import type { ApiTodo } from '../api/todo.js';

/** model: end */
/** model: begin */
import type { ModelTodo } from '../model/todo.js';
/** controller: end */
/** controller: begin */
import type { ControllerPageItem } from '../page/item/controller.jsx';
import type { ControllerPageTodo } from '../page/todo/controller.jsx';

import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** pages: begin */
import { ControllerPageItemSchemaParams, ControllerPageItemSchemaQuery } from '../page/item/controller.jsx';
/** api: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
/** pages: end */

import 'zova';
import 'zova';

import 'zova';

export * from '../api/todo.js';
declare module 'zova' {}
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

/** openapi: end */
/** model: begin */
export * from '../model/todo.js';
declare module 'zova' {}
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
/** model: end */
/** controller: begin */
export * from '../page/item/controller.jsx';
export * from '../page/todo/controller.jsx';
declare module 'zova' {}
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
export * from '../routes.js';
export namespace NSControllerPageItem {
  export const paramsSchema = ControllerPageItemSchemaParams;
  export type ParamsInput = z.input<typeof ControllerPageItemSchemaParams>;
  export type ParamsOutput = z.output<typeof ControllerPageItemSchemaParams>;

  export const querySchema = ControllerPageItemSchemaQuery;
  export type QueryInput = z.input<typeof ControllerPageItemSchemaQuery>;
  export type QueryOutput = z.output<typeof ControllerPageItemSchemaQuery>;
}
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/todo/todo': undefined;
  }
  export interface IPageNameRecord {
    'demo-todo:item': TypePageParamsQuery<NSControllerPageItem.QueryInput, NSControllerPageItem.ParamsInput>;
  }
}
export const pagePathSchemas = {};
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
