import type { RowData, Table, TableFeature } from '@tanstack/table-core';
import type { SchemaObject } from 'openapi3-ts/oas31';
import type { TableFeatureSchemaOptions } from '../types/tableFeatureSchema.js';
import { getProperty } from '@cabloy/utils';

export const TableFeatureSchema: TableFeature<any> = {

  getDefaultOptions: <TData extends RowData>(
    _table: Table<TData>,
  ): TableFeatureSchemaOptions<TData> => {
    return {
      schema: undefined,
    } as TableFeatureSchemaOptions<TData>;
  },

  // define the new feature's table instance methods
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.getProperty = (accessorKey: string): SchemaObject | undefined => {
      const schema = table.options.schema;
      if (!schema) return undefined;
      return getProperty<SchemaObject>(schema.properties, accessorKey);
    };
  },

  // if you need to add row instance APIs...
  // createRow: <TData extends RowData>(row, table): void => {},
  // if you need to add cell instance APIs...
  // createCell: <TData extends RowData>(cell, column, row, table): void => {},
  // if you need to add column instance APIs...
  // createColumn: <TData extends RowData>(column, table): void => {},
  // if you need to add header instance APIs...
  // createHeader: <TData extends RowData>(header, table): void => {},
};
