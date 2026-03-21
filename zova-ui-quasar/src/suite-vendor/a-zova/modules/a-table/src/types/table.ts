import type { ColumnDef, RowData, useVueTable } from '@tanstack/vue-table';
import type { SchemaObject } from 'openapi3-ts/oas31';

import type { TypeTableCellRender } from './tableColumn.js';

export type TypeTable<TData extends RowData = RowData> = ReturnType<typeof useVueTable<TData>>;

export type TypeColumn<TData extends RowData = RowData> = ColumnDef<TData, any>;

export interface ITableMeta<TData extends RowData = RowData> {
  properties: SchemaObject[];
  renders: Record<string, TypeTableCellRender<TData>>;
}

export type TypeTableGetColumnsNext<TData extends RowData = RowData> = (properties?: SchemaObject[]) => Promise<TypeColumn<TData>[]>;
