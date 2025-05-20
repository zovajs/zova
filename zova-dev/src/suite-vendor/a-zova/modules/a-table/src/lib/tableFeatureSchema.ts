import type { Cell, Column, Header, Row, RowData, Table, TableFeature } from '@tanstack/table-core';
import type { SchemaObject } from 'openapi3-ts/oas31';
import type { TableFeatureSchemaOptions } from '../types/tableFeatureSchema.js';
import { getProperty } from '@cabloy/utils';
import { deepExtend } from 'zova';

const SymbolPropertiesCache = Symbol('SymbolPropertiesCache');

export const TableFeatureSchema: TableFeature<any> = {

  getDefaultOptions: <TData extends RowData>(
    _table: Table<TData>,
  ): TableFeatureSchemaOptions<TData> => {
    return {
      schema: undefined,
    } as TableFeatureSchemaOptions<TData>;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.getProperty = (accessorKey: string): SchemaObject | undefined => {
      const schema = table.options.schema;
      if (!schema) return undefined;
      if (!table[SymbolPropertiesCache]) {
        const property = getProperty<SchemaObject>(schema.properties, accessorKey);
        if (!property) return undefined;
        table[SymbolPropertiesCache] = property.rest?.table ? deepExtend({}, property, { rest: property.rest?.table }) : property;
      }
      return table[SymbolPropertiesCache];
    };
  },

  createRow: <TData extends RowData>(row: Row<TData>, table: Table<TData>): void => {
    row.getProperty = (accessorKey: string): SchemaObject | undefined => {
      return table.getProperty(accessorKey);
    };
  },

  createColumn: <TData extends RowData>(column: Column<TData>, table: Table<TData>): void => {
    Object.defineProperty(column, 'property', {
      get() {
        return table.getProperty(column.id);
      },
    });
  },

  createHeader: <TData extends RowData>(header: Header<TData, unknown>, table: Table<TData>): void => {
    Object.defineProperty(header, 'property', {
      get() {
        return table.getProperty(header.column.id);
      },
    });
  },

  createCell: <TData extends RowData>(cell: Cell<TData, unknown>, column: Column<TData>, _row: Row<TData>, table: Table<TData>): void => {
    Object.defineProperty(cell, 'property', {
      get() {
        return table.getProperty(column.id);
      },
    });
  },
};
