import type { ColumnDef, Row, RowData, useVueTable } from '@tanstack/vue-table';
import type { SchemaObject } from 'openapi3-ts/oas31';
import type { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import type { TypeTableCellRender } from './tableColumn.js';

export type TypeTable<TData extends RowData = RowData> = ReturnType<typeof useVueTable<TData>>;

export type TypeColumn<TData extends RowData = RowData> = ColumnDef<TData, any>;

export interface ITablePaged {
  pageNo: number;
  pageSize?: number;
}

export interface ITableQuery {
  columns?: string[] | undefined;
  where?: {
    [key: string]: unknown;
  } | undefined;
  orders?: string | string[][] | undefined;
  pageNo?: number;
  pageSize?: number;
}

export interface ITableRes<Entity = any> extends ITableResPaged {
  list: Entity[];
}

export interface ITableResPaged {
  total: string;
  pageCount: number;
  pageSize: number;
  pageNo: number;
}

export interface ITableMeta<TData extends RowData = RowData> {
  properties: SchemaObject[];
  renders: Record<string, TypeTableCellRender<TData>>;
}

export type TypeTableGetColumnsNext<TData extends RowData = RowData> = (properties?: SchemaObject[]) => Promise<TypeColumn<TData>[]>;

export interface ITableActionHandler<TData extends RowData = any> {
  onActionTable?: (action: keyof TypeResourceActionTableRecord) => Promise<any> | undefined;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => Promise<any> | undefined;
}
