import type { ColumnDef, useVueTable } from '@tanstack/vue-table';
import type { SchemaObject } from 'openapi3-ts/oas31';

import { TypeTableCellRenderComponent } from 'zova-module-a-openapi';

import type { ControllerTable } from '../component/table/controller.jsx';
import type { TypeTableCellRender } from './tableColumn.js';

export type TypeTable<TData extends {} = {}> = ReturnType<typeof useVueTable<TData>>;

export type TypeColumn<TData extends {} = {}> = ColumnDef<TData, any>;

export interface ITableMeta<TData extends {} = {}> {
  properties: SchemaObject[];
  renders: Record<string, TypeTableCellRender<TData>>;
}

export type TypeTableGetColumnsNext<TData extends {} = {}> = (properties?: SchemaObject[]) => Promise<TypeColumn<TData>[]>;

export type TypeTablePropsCreateColumnRender<TData extends {} = {}> = (
  key: string,
  render: TypeTableCellRenderComponent,
) => Promise<TypeTableCellRender<TData, any> | undefined>;

export type TypeTablePropsGetColumns<TData extends {} = {}> = (
  next: TypeTableGetColumnsNext<TData>,
  createColumnRender: TypeTablePropsCreateColumnRender<TData>,
  table: ControllerTable<TData>,
) => Promise<TypeColumn<TData>[]>;
