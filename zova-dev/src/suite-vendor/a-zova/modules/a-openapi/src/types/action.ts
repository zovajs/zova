import type { BeanBase, ZovaApplication, ZovaContext } from 'zova';
import type { ZovaJsx } from 'zova-jsx';
import type { IActionRecord } from 'zova-module-a-action';

import { TableIdentity } from 'table-identity';

import { TypeOpenapiPermissions } from './resourceMeta.js';

export interface IJsxRenderContextBase {
  app: ZovaApplication;
  ctx: ZovaContext;
  $scene?: keyof IJsxRenderSceneRecord;
  $host: BeanBase;
  $celScope?: unknown;
  $jsx: ZovaJsx;
}

export interface IJsxRenderContextPageEntry extends IJsxRenderContextBase {
  $celScope: IPageEntryScope;
  // $$pageEntry: ControllerRestPageEntry<TData>;
}

export interface IPageEntryScope {
  resource?: string;
  id?: TableIdentity;
  permissions?: TypeOpenapiPermissions;
}

export interface IJsxRenderSceneRecord {
  page: never;
  pageEntry: never;
  // table: never;
  tableColumn: never;
  tableCell: never;
  // form: never;
  formField: never;
}

export type TypeActionProvider = keyof IActionRecord;

export interface IPageScope {
  resource?: string;
  permissions?: TypeOpenapiPermissions;
}

export interface IJsxRenderContextPage extends IJsxRenderContextBase {
  $celScope: IPageScope;
  // $$page: ControllerRestPage<TData>;
}
