import type { CellContext, RowData } from '@tanstack/table-core';

export const constColumnProps = '$$ColumnProps';

export type TypeTableCellRender<TData extends RowData = RowData, TValue = any> = (props?: CellContext<TData, TValue>) => any;
