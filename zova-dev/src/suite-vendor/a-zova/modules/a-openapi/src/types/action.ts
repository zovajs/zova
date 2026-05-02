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

export interface IJsxRenderContextPageEntryWrapper extends IJsxRenderContextBase {
  $celScope: IPageEntryWrapperScope;
  //$$pageEntryWrapper: ControllerPageEntry;
}

export interface IPageEntryWrapperScope {
  resource?: string;
  id?: TableIdentity;
  permissions?: TypeOpenapiPermissions;
}

export interface IPageEntryScope extends IPageEntryWrapperScope {}

export interface IJsxRenderSceneRecord {
  pageWrapper: never;
  page: never;
  pageEntryWrapper: never;
  pageEntry: never;
  // table: never;
  tableColumn: never;
  tableCell: never;
  // form: never;
  formField: never;
}

export type TypeActionProvider = keyof IActionRecord;

export interface IPageWrapperScope {
  resource?: string;
  permissions?: TypeOpenapiPermissions;
}

export interface IJsxRenderContextPageWrapper extends IJsxRenderContextBase {
  $celScope: IPageWrapperScope;
  // $$pageWrapper: ControllerPageResource;
}

export interface IPageScope extends IPageWrapperScope {}

export interface IJsxRenderContextPage extends IJsxRenderContextBase {
  $celScope: IPageScope;
  // $$page: ControllerRestPage<TData>;
}
