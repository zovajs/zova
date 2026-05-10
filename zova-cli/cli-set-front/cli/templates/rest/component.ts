import type z from 'zod';
import type { TypeRenderComponentJsx } from 'zova-jsx';
import type {
  IResourceFormFieldRecord,
  IResourceTableCellRecord,
  IResourceTableActionRowRecord,
  IResourceFormActionRowRecord,
  TypeFormSchemaScene,
  IResourceRenderFormActionRowOptionsAction,
  IResourceComponentActionRowOptionsAction,
  IResourceActionBulkRecord,
  IResourceComponentActionBulkOptionsAction,
  IResourceComponentBlockRecord,
  IResourceComponentBlockOptionsBlock,
  IResourceTableActionRowOptionsBase,
  IResourceFormActionRowOptionsBase,
} from 'zova-module-a-openapi';

import { toLowerCaseFirstChar, toUpperCaseFirstChar } from '@cabloy/word-utils';

import { _generalSchemaRest } from './inner.ts';

export function schemaRenderField<K extends keyof IResourceFormFieldRecord, T extends z.ZodType>(
  name: K,
  options?: IResourceFormFieldRecord[K],
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

export function schemaRenderCell<K extends keyof IResourceTableCellRecord, T extends z.ZodType>(name: K, options?: IResourceTableCellRecord[K]) {
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

export function schemaRenderTableActionRow<K extends keyof IResourceTableActionRowRecord>(
  render: K,
  options?: IResourceTableActionRowRecord[K],
): IResourceRenderFormActionRowOptionsAction {
  const pos = render.toString().indexOf(':action');
  const name = pos > -1 ? toLowerCaseFirstChar(render.toString().substring(pos + ':action'.length)) : undefined;
  return { $$typeof: 'zova-jsx:actionRow', name, render, options };
}

export function schemaRenderTableActionRowJsx(
  renderComponentJsx: TypeRenderComponentJsx,
  options?: Pick<IResourceTableActionRowOptionsBase, 'permission'>,
) {
  return { render: renderComponentJsx, options };
}

export function schemaRenderFormActionRow<K extends keyof IResourceFormActionRowRecord>(
  render: K,
  options?: IResourceFormActionRowRecord[K],
): IResourceComponentActionRowOptionsAction {
  const pos = render.toString().indexOf(':action');
  const name = pos > -1 ? toLowerCaseFirstChar(render.toString().substring(pos + ':action'.length)) : undefined;
  return { $$typeof: 'zova-jsx:actionRow', name, render, options };
}

export function schemaRenderFormActionRowJsx(
  renderComponentJsx: TypeRenderComponentJsx,
  options?: Pick<IResourceFormActionRowOptionsBase, 'permission'>,
) {
  return { render: renderComponentJsx, options };
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
