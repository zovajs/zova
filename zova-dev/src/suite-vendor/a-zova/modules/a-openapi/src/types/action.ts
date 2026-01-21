import type { BeanBase, ZovaApplication, ZovaContext } from 'zova';
import type { IActionRecord } from 'zova-module-a-action';

export interface IJsxRenderContextBase {
  $$scene?: keyof IJsxRenderSceneRecord;
  $$host: BeanBase;
  app: ZovaApplication;
  ctx: ZovaContext;
}

export interface IJsxRenderSceneRecord {
  table: never;
  tableCell: never;
  form: never;
  formField: never;
}

export type TypeActionProvider = keyof IActionRecord;
