import type { BeanBase, ZovaApplication, ZovaContext } from 'zova';
import type { IActionRecord } from 'zova-module-a-action';

export interface IRenderContextBase {
  $$scene?: keyof IRenderSceneRecord;
  $$host: BeanBase;
  app: ZovaApplication;
  ctx: ZovaContext;
}

export interface IRenderSceneRecord {
  table: never;
  tableCell: never;
  form: never;
  formField: never;
}

export type TypeActionProvider = keyof IActionRecord;
