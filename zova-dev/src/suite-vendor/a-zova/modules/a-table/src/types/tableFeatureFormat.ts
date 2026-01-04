import type { CellContext, RowData } from '@tanstack/vue-table';
import type { TypeComposer } from 'zova-module-a-bean';
import '@tanstack/vue-table';

export interface TableFeatureFormatOptions<_TData extends RowData> {
}

export interface TableFeatureFormatInstance<_TData extends RowData> {
  getFormat: (accessorKey: string) => TypeComposer | undefined;
}

export interface TableFeatureFormatCell<TData extends RowData, TValue> {
  get format(): TypeComposer | undefined;
  formatRender(props?: CellContext<TData, TValue>): any;
}

declare module '@tanstack/vue-table' {

  export interface TableOptionsResolved<TData extends RowData>
    extends TableFeatureFormatOptions<TData> {}

  export interface Table<TData extends RowData> extends TableFeatureFormatInstance<TData> {}

  export interface Cell<TData extends RowData, TValue> extends TableFeatureFormatCell<TData, TValue> {}

}
