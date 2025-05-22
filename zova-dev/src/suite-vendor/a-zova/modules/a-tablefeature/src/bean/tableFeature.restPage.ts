import { RowData, Table } from '@tanstack/table-core';
import { BeanTableFeatureBase, IDecoratorTableFeatureOptions, ITableActionHandler, TableFeature } from 'zova-module-a-table';

export interface TableFeatureRestPageOptions<TData extends RowData> {
  restPage?: ITableActionHandler<TData>;
}

export interface TableFeatureRestPageInstance<_TData extends RowData> {}

export interface TableFeatureRestPageRow<_TData extends RowData> {}

export interface TableFeatureRestPageColumn<_TData extends RowData, _TValue> {}

export interface TableFeatureRestPageHeader<_TData extends RowData, _TValue> {}

export interface TableFeatureRestPageCell<_TData extends RowData, _TValue> {}

declare module '@tanstack/vue-table' {

  export interface TableOptionsResolved<TData extends RowData>
    extends TableFeatureRestPageOptions<TData> {}

  export interface Table<TData extends RowData> extends TableFeatureRestPageInstance<TData> {}

  export interface Row<TData extends RowData> extends TableFeatureRestPageRow<TData> {}

  export interface Column<TData extends RowData, TValue> extends TableFeatureRestPageColumn<TData, TValue> {}

  export interface Header<TData extends RowData, TValue> extends TableFeatureRestPageHeader<TData, TValue> {}

  export interface Cell<TData extends RowData, TValue> extends TableFeatureRestPageCell<TData, TValue> {}
}

export interface ITableFeatureOptionsRestPage extends IDecoratorTableFeatureOptions {}

@TableFeature<ITableFeatureOptionsRestPage>()
export class TableFeatureRestPage extends BeanTableFeatureBase {
  getDefaultOptions<TData extends RowData>(_table: Table<TData>): TableFeatureRestPageOptions<TData> {
    return {
      restPage: undefined,
    } as TableFeatureRestPageOptions<TData>;
  }
}
