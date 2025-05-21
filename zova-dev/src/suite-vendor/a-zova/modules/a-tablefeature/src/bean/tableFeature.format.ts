import { Cell, Column, Row, RowData, Table } from '@tanstack/table-core';
import { TypeComposer } from 'zova-module-a-bean';
import { BeanTableFeatureBase, IDecoratorTableFeatureOptions, TableFeature } from 'zova-module-a-table';

export interface TableFeatureFormatOptions<_TData extends RowData> {}

export interface TableFeatureFormatInstance<_TData extends RowData> {}

export interface TableFeatureFormatRow<_TData extends RowData> {}

export interface TableFeatureFormatColumn<_TData extends RowData, _TValue> {}

export interface TableFeatureFormatHeader<_TData extends RowData, _TValue> {}

export interface TableFeatureFormatCell<_TData extends RowData, _TValue> {}

declare module '@tanstack/vue-table' {

  export interface TableOptionsResolved<TData extends RowData>
    extends TableFeatureFormatOptions<TData> {}

  export interface Table<TData extends RowData> extends TableFeatureFormatInstance<TData> {}

  export interface Row<TData extends RowData> extends TableFeatureFormatRow<TData> {}

  export interface Column<TData extends RowData, TValue> extends TableFeatureFormatColumn<TData, TValue> {}

  export interface Header<TData extends RowData, TValue> extends TableFeatureFormatHeader<TData, TValue> {}

  export interface Cell<TData extends RowData, TValue> extends TableFeatureFormatCell<TData, TValue> {}
}

export interface ITableFeatureOptionsFormat extends IDecoratorTableFeatureOptions {}

@TableFeature<ITableFeatureOptionsFormat>()
export class TableFeatureFormat extends BeanTableFeatureBase {
  getDefaultOptions<TData extends RowData>(_table: Table<TData>): TableFeatureFormatOptions<TData> {
    return {
      formats: undefined,
    } as TableFeatureFormatOptions<TData>;
  }

  createTable<TData extends RowData>(table: Table<TData>): void {
    table.getFormat = (accessorKey: string): TypeComposer | undefined => {
      return table.options.formats?.[accessorKey];
    };
  }

  createCell<TData extends RowData>(cell: Cell<TData, unknown>, column: Column<TData>, _row: Row<TData>, table: Table<TData>): void {
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
  }
}
