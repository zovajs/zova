import type { Row, RowData } from '@tanstack/table-core';
import type { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';

export interface ITableActionHandler<TData extends RowData = any> {
  onActionTable(action: keyof TypeResourceActionTableRecord): Promise<any>;
  onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<TData>): Promise<any>;
}
