import type { BeanBase, ZovaApplication, ZovaContext } from 'zova';
import type { IActionRecord } from 'zova-module-a-action';

export interface IJsxRenderContextBase {
  app: ZovaApplication;
  ctx: ZovaContext;
  $scene?: keyof IJsxRenderSceneRecord;
  $host: BeanBase;
  $celScope?: unknown;
}

export interface IJsxRenderSceneRecord {
  table: never;
  tableCell: never;
  form: never;
  formField: never;
}

export type TypeActionProvider = keyof IActionRecord;
