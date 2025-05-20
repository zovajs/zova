import type { Cell, Column, Row, RowData, Table, TableFeature } from '@tanstack/table-core';
import type { TypeComposer } from 'zova-module-a-bean';
import type { TableFeatureFormatOptions } from '../types/tableFeatureFormat.js';

export const TableFeatureFormat: TableFeature<any> = {

  getDefaultOptions: <TData extends RowData>(
    _table: Table<TData>,
  ): TableFeatureFormatOptions<TData> => {
    return {
      formats: undefined,
    } as TableFeatureFormatOptions<TData>;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.getFormat = (accessorKey: string): TypeComposer | undefined => {
      return table.options.formats?.[accessorKey];
    };
  },

  createCell: <TData extends RowData>(cell: Cell<TData, unknown>, column: Column<TData>, _row: Row<TData>, table: Table<TData>): void => {
    Object.defineProperty(cell, 'format', {
      get() {
        return table.getFormat(column.id);
      },
    });
    cell.formatRender = function (props) {
      props = props ?? this.getContext();
      const format = cell.format;
      if (!format) return props.getValue();
      return format(props, props => {
        return props.getValue();
      });
    };
  },
};
