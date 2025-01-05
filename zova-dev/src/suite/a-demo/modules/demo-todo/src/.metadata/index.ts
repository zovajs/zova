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
/** controller: begin */
export * from '../page/item/controller.jsx';
export * from '../page/todo/controller.jsx';

import 'zova';
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
/** controller: end */
/** controller: begin */
import { ControllerPageItem } from '../page/item/controller.jsx';
import { ControllerPageTodo } from '../page/todo/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-todo.controller.pageItem': ControllerPageItem;
    'demo-todo.controller.pageTodo': ControllerPageTodo;
  }
}
/** controller: end */
/** pages: begin */
import { ControllerPageItemSchemaParams, ControllerPageItemSchemaQuery } from '../page/item/controller.jsx';
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import { zz } from 'zova';
import 'zova';
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
export namespace NSControllerPageItem {
  export const paramsSchema = ControllerPageItemSchemaParams;
  export type ParamsInput = zz.input<typeof ControllerPageItemSchemaParams>;
  export type ParamsOutput = zz.output<typeof ControllerPageItemSchemaParams>;

  export const querySchema = ControllerPageItemSchemaQuery;
  export type QueryInput = zz.input<typeof ControllerPageItemSchemaQuery>;
  export type QueryOutput = zz.output<typeof ControllerPageItemSchemaQuery>;
}
/** pages: end */

/** components: begin */

export const components = {};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {}
}
declare module 'zova-module-demo-todo' {}
/** components: end */
/** render: begin */
export * from '../page/item/render.jsx';
export * from '../page/todo/render.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-demo-todo' {
  export interface RenderPageItem {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

  export interface RenderPageTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
/** render: end */
/** render: begin */
import { RenderPageItem } from '../page/item/render.jsx';
import { RenderPageTodo } from '../page/todo/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-todo.render.pageItem': RenderPageItem;
    'demo-todo.render.pageTodo': RenderPageTodo;
  }
}
/** render: end */
/** renders: begin */
declare module 'zova-module-demo-todo' {}
/** renders: end */
/** style: begin */
export * from '../page/item/style.js';
export * from '../page/todo/style.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-demo-todo' {
  export interface StyleItem {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }

  export interface StyleTodo {
    /** @internal */
    get scope(): ScopeModuleDemoTodo;
  }
}
/** style: end */
/** style: begin */
import { StyleItem } from '../page/item/style.js';
import { StyleTodo } from '../page/todo/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-todo.style.item': StyleItem;
    'demo-todo.style.todo': StyleTodo;
  }
}
/** style: end */
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
