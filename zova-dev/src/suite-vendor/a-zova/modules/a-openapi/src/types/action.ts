import type { BeanBase, ZovaApplication, ZovaContext } from 'zova';

export interface IRenderContextBase {
  scene?: keyof IRenderSceneRecord;
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
