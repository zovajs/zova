import type z from 'zod';
import type { TypeRenderComponentJsx } from 'zova-jsx';
import type {
  IResourceComponentFormFieldRecord,
  TypeFormSchemaScene,
  IResourceTableCellActionRowRecordBoth,
  IResourceActionRowRecord,
  IResourceComponentActionRowOptionsAction,
  IResourceActionBulkRecord,
  IResourceComponentActionBulkOptionsAction,
  IResourceComponentBlockRecord,
  IResourceComponentBlockOptionsBlock,
} from 'zova-module-a-openapi';

import { toUpperCaseFirstChar } from '@cabloy/word-utils';

import { _generalSchemaRest } from './inner.ts';

export function schemaRenderField<K extends keyof IResourceComponentFormFieldRecord, T extends z.ZodType>(
  name: K,
  options?: IResourceComponentFormFieldRecord[K],
  scene?: TypeFormSchemaScene,
) {
  return function (schema: T): T {
    const options2 = options !== undefined ? { render: name as never, options } : { render: name as never };
    return _generalSchemaRest(schema, options2, scene ?? 'form'); // diff from table
  };
}

export function schemaRenderFieldJsx<T extends z.ZodType>(renderComponentJsx: TypeRenderComponentJsx, scene?: TypeFormSchemaScene) {
  return function (schema: T): T {
    const options = { render: renderComponentJsx };
    return _generalSchemaRest(schema, options, scene ?? 'form'); //diff from table
  };
}

export function schemaRenderCell<K extends keyof IResourceTableCellActionRowRecordBoth, T extends z.ZodType>(
  name: K,
  options?: IResourceTableCellActionRowRecordBoth[K],
) {
  return function (schema: T): T {
    const options2 = options !== undefined ? { render: name as never, columnProps: options } : { render: name as never };
    return _generalSchemaRest(schema, options2, 'table');
  };
}

export function schemaRenderCellJsx<T extends z.ZodType>(renderComponentJsx: TypeRenderComponentJsx) {
  return function (schema: T): T {
    const options = { render: renderComponentJsx };
    return _generalSchemaRest(schema, options, 'table');
  };
}

export function schemaRenderActionRow<K extends keyof IResourceActionRowRecord>(
  name: K,
  options?: IResourceActionRowRecord[K],
): IResourceComponentActionRowOptionsAction {
  const render = 'Action' + toUpperCaseFirstChar(name);
  return { $$typeof: 'zova-jsx:actionRow', name, render: render as any, options };
}

export function schemaRenderActionRowJsx<K extends keyof IResourceActionRowRecord>(name: K, renderComponentJsx: TypeRenderComponentJsx) {
  return { name, render: renderComponentJsx };
}

export function schemaRenderActionBulk<K extends keyof IResourceActionBulkRecord>(
  name: K,
  options?: IResourceActionBulkRecord[K],
): IResourceComponentActionBulkOptionsAction {
  const render = 'Action' + toUpperCaseFirstChar(name);
  return { $$typeof: 'zova-jsx:actionBulk', name, render: render as any, options };
}

export function schemaRenderActionBulkJsx<K extends IResourceActionBulkRecord>(name: K, renderComponentJsx: TypeRenderComponentJsx) {
  return { name, render: renderComponentJsx };
}

export function schemaRenderBlock<K extends keyof IResourceComponentBlockRecord>(
  name: K,
  options?: IResourceComponentBlockRecord[K],
): IResourceComponentBlockOptionsBlock {
  return { $$typeof: 'zova-jsx:block', render: name, options };
}

export function schemaRenderBlockJsx(renderComponentJsx: TypeRenderComponentJsx) {
  return { render: renderComponentJsx };
}
