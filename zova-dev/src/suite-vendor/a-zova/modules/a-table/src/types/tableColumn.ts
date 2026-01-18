import type { CellContext, RowData } from '@tanstack/table-core';
import type { SchemaObject } from 'openapi3-ts/oas31';
import type { TypeTableCellRenderComponent } from 'zova-module-a-openapi';

export const constColumnProps = '$$ColumnProps';

export type TypeTableCellRender<TData extends RowData = RowData, TValue = any> = (props?: CellContext<TData, TValue>) => any;

export interface ITableCellRenderColumnProps {
  key: string;
  name: string;
  visible?: boolean;
  render: TypeTableCellRenderComponent;
}

export interface ITableCelScope {}

export interface ITableColumnCelScope extends ITableCelScope {
  name: string;
  property?: SchemaObject;
}

export interface ITableCellCelScope extends ITableColumnCelScope {
  value: any;
  displayValue?: any;
}
