import type { Row, RowData } from '@tanstack/table-core';
import type { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';

export interface ITableActionHandler<TData extends RowData = any> {
  onActionTable?: (action: keyof TypeResourceActionTableRecord) => Promise<any> | undefined;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => Promise<any> | undefined;
}

export interface ITableActionHandlerTable<_TData extends RowData = any> {
  create(): Promise<any> | undefined;
}

export interface ITableActionHandlerRow<_TData extends RowData = any> {
  view(): Promise<any> | undefined;
  update(): Promise<any> | undefined;
  delete(): Promise<any> | undefined;
}
