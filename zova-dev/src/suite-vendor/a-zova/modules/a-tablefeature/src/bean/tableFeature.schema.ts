import { getProperty } from '@cabloy/utils';
import { Cell, Column, Header, Row, RowData, Table } from '@tanstack/table-core';
import { SchemaObject } from 'openapi3-ts/oas31';
import { deepExtend } from 'zova';
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

const SymbolPropertiesCache = Symbol('SymbolPropertiesCache');

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
      if (!table[SymbolPropertiesCache]) table[SymbolPropertiesCache] = {};
      if (!table[SymbolPropertiesCache][accessorKey]) {
        const property = getProperty<SchemaObject>(schema.properties, accessorKey);
        if (!property) return undefined;
        table[SymbolPropertiesCache][accessorKey] = property.rest?.table ? deepExtend({}, property, { rest: property.rest?.table }) : property;
      }
      return table[SymbolPropertiesCache][accessorKey];
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
