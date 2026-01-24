import type { BeanBase, ZovaApplication, ZovaContext } from 'zova';
import type { ZovaJsx } from 'zova-jsx';
import type { IActionRecord } from 'zova-module-a-action';

export interface IJsxRenderContextBase {
  app: ZovaApplication;
  ctx: ZovaContext;
  $scene?: keyof IJsxRenderSceneRecord;
  $host: BeanBase;
  $celScope?: unknown;
  $jsx: ZovaJsx;
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
