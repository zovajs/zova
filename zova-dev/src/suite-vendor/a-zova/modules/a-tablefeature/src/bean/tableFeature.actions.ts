import { RowData, Table } from '@tanstack/table-core';
import { BeanTableFeatureBase, IDecoratorTableFeatureOptions, ITableActionHandler, TableFeature } from 'zova-module-a-table';

export interface TableFeatureActionsOptions<TData extends RowData> {
  actions?: ITableActionHandler<TData>;
}

export interface TableFeatureActionsInstance<_TData extends RowData> {}

export interface TableFeatureActionsRow<_TData extends RowData> {}

export interface TableFeatureActionsColumn<_TData extends RowData, _TValue> {}

export interface TableFeatureActionsHeader<_TData extends RowData, _TValue> {}

export interface TableFeatureActionsCell<_TData extends RowData, _TValue> {}

declare module '@tanstack/vue-table' {

  export interface TableOptionsResolved<TData extends RowData>
    extends TableFeatureActionsOptions<TData> {}

  export interface Table<TData extends RowData> extends TableFeatureActionsInstance<TData> {}

  export interface Row<TData extends RowData> extends TableFeatureActionsRow<TData> {}

  export interface Column<TData extends RowData, TValue> extends TableFeatureActionsColumn<TData, TValue> {}

  export interface Header<TData extends RowData, TValue> extends TableFeatureActionsHeader<TData, TValue> {}

  export interface Cell<TData extends RowData, TValue> extends TableFeatureActionsCell<TData, TValue> {}
}

export interface ITableFeatureOptionsActions extends IDecoratorTableFeatureOptions {}

@TableFeature<ITableFeatureOptionsActions>()
export class TableFeatureActions extends BeanTableFeatureBase {
  getDefaultOptions<TData extends RowData>(_table: Table<TData>): TableFeatureActionsOptions<TData> {
    return {
      actions: undefined,
    } as TableFeatureActionsOptions<TData>;
  }
}
