import type { ColumnDef, RowData, useVueTable } from '@tanstack/vue-table';

export type TypeTable<TData extends RowData = RowData> = ReturnType<typeof useVueTable<TData>>;

export type TypeColumn<TData extends RowData = RowData> = ColumnDef<TData, any>;
