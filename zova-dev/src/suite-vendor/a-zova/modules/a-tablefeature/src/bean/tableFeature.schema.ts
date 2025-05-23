import { getProperty } from '@cabloy/utils';
import { Cell, Column, Header, Row, RowData, Table } from '@tanstack/table-core';
import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanTableFeatureBase, IDecoratorTableFeatureOptions, TableFeature } from 'zova-module-a-table';

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

export interface ITableFeatureOptionsSchema extends IDecoratorTableFeatureOptions {}

@TableFeature<ITableFeatureOptionsSchema>()
export class TableFeatureSchema extends BeanTableFeatureBase {
  getDefaultOptions<TData extends RowData>(_table: Table<TData>): TableFeatureSchemaOptions<TData> {
    return {
      schema: undefined,
    } as TableFeatureSchemaOptions<TData>;
  }

  createTable<TData extends RowData>(table: Table<TData>): void {
    table.getProperty = (accessorKey: string): SchemaObject | undefined => {
      const schema = table.options.schema;
      if (!schema) return undefined;
      return getProperty<SchemaObject>(schema.properties, accessorKey);
    };
  }

  createRow<TData extends RowData>(row: Row<TData>, table: Table<TData>): void {
    row.getProperty = (accessorKey: string): SchemaObject | undefined => {
      return table.getProperty(accessorKey);
    };
  }

  createColumn<TData extends RowData>(column: Column<TData>, table: Table<TData>): void {
    Object.defineProperty(column, 'property', {
      get() {
        return table.getProperty(column.id);
      },
    });
  }

  createHeader<TData extends RowData>(header: Header<TData, unknown>, table: Table<TData>): void {
    Object.defineProperty(header, 'property', {
      get() {
        return table.getProperty(header.column.id);
      },
    });
  }

  createCell<TData extends RowData>(cell: Cell<TData, unknown>, column: Column<TData>, _row: Row<TData>, table: Table<TData>): void {
    Object.defineProperty(cell, 'property', {
      get() {
        return table.getProperty(column.id);
      },
    });
  }
}
