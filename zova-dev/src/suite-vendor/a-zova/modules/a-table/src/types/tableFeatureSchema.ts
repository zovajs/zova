import type { RowData } from '@tanstack/vue-table';
import type { SchemaObject } from 'openapi3-ts/oas31';
import '@tanstack/vue-table';

export interface TableFeatureSchemaOptions<_TData extends RowData> {
  schema?: SchemaObject;
}

export interface TableFeatureSchemaInstance<_TData extends RowData> {
  getProperty: (accessorKey: string) => SchemaObject | undefined;
}

export interface TableFeatureSchemaRow<_TData extends RowData> {
  getProperty: (accessorKey: string) => SchemaObject | undefined;
}

export interface TableFeatureSchemaColumn<_TData extends RowData, _TValue> {
  get property(): SchemaObject | undefined;
}

export interface TableFeatureSchemaHeader<_TData extends RowData, _TValue> {
  get property(): SchemaObject | undefined;
}

export interface TableFeatureSchemaCell<_TData extends RowData, _TValue> {
  get property(): SchemaObject | undefined;
}

declare module '@tanstack/vue-table' {

  export interface TableOptionsResolved<TData extends RowData>
    extends TableFeatureSchemaOptions<TData> {}

  export interface Table<TData extends RowData> extends TableFeatureSchemaInstance<TData> {}

  export interface Row<TData extends RowData> extends TableFeatureSchemaRow<TData> {}

  export interface Column<TData extends RowData, TValue> extends TableFeatureSchemaColumn<TData, TValue> {}

  export interface Header<TData extends RowData, TValue> extends TableFeatureSchemaHeader<TData, TValue> {}

  export interface Cell<TData extends RowData, TValue> extends TableFeatureSchemaCell<TData, TValue> {}

}
