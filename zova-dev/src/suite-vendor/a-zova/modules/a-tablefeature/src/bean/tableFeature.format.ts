import { RowData } from '@tanstack/table-core';
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
export class TableFeatureFormat extends BeanTableFeatureBase {}
