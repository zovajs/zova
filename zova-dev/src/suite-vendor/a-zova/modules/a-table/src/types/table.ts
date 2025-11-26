import type { ColumnDef, RowData, useVueTable } from '@tanstack/vue-table';

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
