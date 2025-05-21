import type { Cell, Column, Header, Row, RowData, Table, TableFeature } from '@tanstack/table-core';
import { BeanBase } from 'zova';

export class BeanTableFeatureBase<TData extends RowData = any> extends BeanBase implements TableFeature<TData> {
  getDefaultOptions<TData extends RowData>(_table: Table<TData>) {
    return {};
  }

  createTable<TData extends RowData>(_table: Table<TData>): void {}

  createRow<TData extends RowData>(_row: Row<TData>, _table: Table<TData>): void {}

  createColumn<TData extends RowData>(_column: Column<TData>, _table: Table<TData>): void {}

  createHeader<TData extends RowData>(_header: Header<TData, unknown>, _table: Table<TData>): void {}

  createCell<TData extends RowData>(_cell: Cell<TData, unknown>, _column: Column<TData>, _row: Row<TData>, _table: Table<TData>): void {}
}
